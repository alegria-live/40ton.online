const Q = require("q"),
    dbConnection = require('../utils/dbConnection'),
    Long = require('mongodb').Long;

const activeTrucks = async ({ collectionName }) => {
    try {
        const res = await dbConnection.getDb().collection(collectionName)
            .aggregate([
                { $match: { "Truck.routes": { $elemMatch: { '_id': 1 } } } },
                { $project: { _id: 1 } },
                { $sort: { _id: 1 } }
            ]).toArray();
        return res;
    }
    catch (e) { throw new Error(503); }
};

const trucksFuelEfficiency = ({ collectionName, from, end, param }) => {
    from = Number(from);
    end = Number(end);
    let def = Q.defer();
    dbConnection.getDb().collection(collectionName)
        .aggregate([
            { $match: { 'Truck.fuel._id': { $gt: 0 } } },
            {
                $project: {
                    selectedRoutes: {
                        $filter: {
                            input: '$Truck.fuel',
                            cond: { $and: [{ $gte: ['$$this.dtStop', from] }, { $lte: ['$$this.dtStop', end] }] }
                        }
                    }
                }
            },
            { $match: { selectedRoutes: { $not: { $size: 0 } } } },
            {
                $project: {
                    realAvg: { $avg: `$selectedRoutes.${param}` }
                }
            },
            { $sort: { 'realAvg': 1 } }
        ]).toArray()
        .then(res => def.resolve(res))
        .catch(e => def.reject({ error: 503 }));
    return def.promise;
};

const oneTruckData = async ({ collectionName, truckId }) => {
    try {
        const res = await dbConnection.getDb().collection(collectionName)
            .aggregate([
                { $match: { _id: truckId } },
                { $unwind: '$Truck.fuel' },
                {
                    $group: {
                        _id: '$_id',
                        mediaRealArr: { $push: '$Truck.fuel.mediaReal' },
                        mediaRouteArr: { $push: '$Truck.fuel.mediaRoute' },
                        datesArr: { $push: '$Truck.fuel.dtStop' },
                    }
                }
            ]).next();
        return res;
    }
    catch (e) { throw new Error(503); }
};

//returns truck routes array
const truckRoutes = async ({ collectionName, truckId }) => {
    try {
        const res = await dbConnection.getDb().collection(collectionName)
            .aggregate([
                { $match: { _id: truckId } },
                {
                    $project: {
                        routes: '$Truck.routes'
                    }
                }
            ]).next();
        return res;
    }
    catch (e) { throw new Error(503); }
};

const addTruck = async (truck) => {
    const duplError = 'duplicate key error';
    truck.Truck.paid = Long.fromString(truck.Truck.paid.toString());
    truck.Truck.date = Long.fromString(truck.Truck.date.toString());
    try {
        const res = await dbConnection.getDb()
            .collection(truck.collectionName)
            .insertOne(
                { _id: truck.id, Truck: truck.Truck }               
            );
        return  res.ops[0]._id;
    }
    catch (e) {        
		if(e.message.indexOf(duplError) !== -1 ) { throw new Error(469);}
		else throw new Error(503); 
	}
};

//return array of the trucks with _id, norm i consum for edit trucks
const allTrucks = async (truck) => {
    try {
        const res = await dbConnection.getDb().collection(truck.collectionName)
            .aggregate([{ $match: { "Truck": { $exists: true } } },
            {
                $project: {
                    name: "$Truck.name",
                    norm: "$Truck.norm",
                    consum: "$Truck.consum",
                    paid: "$Truck.paid"
                }
            }])
            .toArray();
        return res;
    }
    catch (e) { throw new Error(503); }
};

function theft(truck) {
    let def = Q.defer();
    dbConnection.getDb().collection(truck.collectionName)
        .findOne({ _id: truck._id }, (err, res) => {

            if (err) { def.reject({ error: 400 }); return; }

            if (!res) { def.reject({ error: 400 }); return; }

            let theftRoute = res.Truck.fuel.find(e => {
                truck.date = new Date(truck.date).getTime();
                return new Date(e.dtStop).getTime() >= truck.date;
            });

            let mediaReal = theftRoute.mediaRoute,
                diff = theftRoute.fuel - (theftRoute.totalRoute * theftRoute.mediaRoute / 100),
                newFuel = theftRoute.fuel - diff,
                routeId = theftRoute._id - 1,
                targetMedia = `Truck.fuel.${routeId}.mediaReal`,
                targetRatio = `Truck.fuel.${routeId}.ratio`,
                targetFuel = `Truck.fuel.${routeId}.fuel`,
                targetFuelD = `Driver.routes.${routeId}.fuel`,
                targetRatioD = `Driver.routes.${routeId}.ratio`,
                targetMediaD = `Driver.routes.${routeId}.mediaReal`;

            dbConnection.getDb().collection(truck.collectionName)
                .findOneAndUpdate({ _id: theftRoute.driver },
                    {
                        $set: {
                            [targetMediaD]: mediaReal, [targetRatioD]: 1,
                            [targetFuelD]: newFuel
                        },
                    }, (err, res) => {

                        if (err) { def.reject({ error: 400 }); return; }

                        dbConnection.getDb().collection(truck.collectionName)
                            .findOneAndUpdate({ _id: truck._id },
                                {
                                    $set: {
                                        [targetMedia]: mediaReal, [targetRatio]: 1,
                                        [targetFuel]: newFuel
                                    },
                                }, (err, res) => {
                                    if (err) { def.reject({ error: 400 }); return; }
                                    def.resolve({ error: diff.toFixed(2) + " l." });
                                });
                    });
        });
    return def.promise;
}

module.exports = {
    activeTrucks,
    trucksFuelEfficiency,
    oneTruckData,
    addTruck,
    allTrucks,
    theft,
    truckRoutes
};