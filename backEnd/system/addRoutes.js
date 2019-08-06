const dbConnection = require('../utils/dbConnection'),
    Q = require("q"),
    ObjectId = require('mongodb').ObjectId;


const addRoute = (id, route) => {
    let def = Q.defer();
    if (route._csrf) { delete route._csrf; }

    dbConnection.getDb().collection(id).findOneAndUpdate({ _id: route.truckId },
        { $push: { "Truck.routes": { $each: [], $slice: route._id } } }, (err, res) => {

            if (err) { def.reject({ msg: 400 }); return; }
            if (!res) { def.reject({ msg: 400 }); return; }

            else {
                let routesLength = (res.value.Truck.routes).length,
                    lastRoute = res.value.Truck.routes[route._id - 1],
                    truckId = route.truckId;

                if (!routesLength || route._id === 0) {
                    route.dtStart = route.dtStop;
                    route.kmStart = route.kmStop;
                    route.tonIn = route.tonOut;
                    route.routeId = 0;
                    route.fuel_Id = 0;
                    delete route.add;
                    delete route.truckId;
                }
                else {
                    route.dtStart = lastRoute.dtStop;
                    route.kmStart = lastRoute.kmStop;
                    route.tonIn = lastRoute.tonOut;
                    route.routeId = lastRoute.routeId;

                    if (lastRoute.type === 1) {
                        route.tonIn = lastRoute.tonIn + lastRoute.tonOut;
                    }
                    if (route.type === 3) {
                        route.tonOut = route.tonIn;
                    }
                    if (lastRoute.full === 1) {
                        route.routeId = lastRoute.routeId + 1;
                    }
                    delete route.add;
                    delete route.truckId;
                }
                route.trip = route.kmStop - route.kmStart;
                route.medTrip = res.value.Truck.consum + (res.value.Truck.norm * route.tonIn);

                if (route.type === 3 && route.full === 1 && route._id !== 0 && !route.correct) {
                    route.fuel_Id = ObjectId();
                }

                let addRouteTruckRes = addRouteTruck(id, truckId, route);
                if (addRouteTruckRes.msg) { def.reject(addRouteTruckRes); return; }
                def.resolve(addRouteTruckRes);
            }
        });
    return def.promise;
};

const addRouteTruck = (id, truckId, route) => {
    let def = Q.defer();

    dbConnection.getDb().collection(id)
        .findOneAndUpdate({ _id: truckId },
            { $push: { "Truck.routes": route } },
            { upsert: true, returnOriginal: false }, (err, res) => {
                if (err) { def.reject({ msg: 400 }); return; }

                def.resolve(res);

                if (route.type === 3 && route.correct && route._id !== 0) {
                    correctFuel(id, truckId, route);
                }

                if (route.type === 3 && route.full === 1 && route._id !== 0 && !route.correct) {
                    calcRoute(id, truckId, route);
                }

            });
    return def.promise;
};

const correctFuel = (id, truckId, route) => {

    dbConnection.getDb().collection(id)
    .findOneAndUpdate({ _id: truckId },
        { $pull: { "Truck.fuel": { fuel_Id: ObjectId(route.fuel_Id) } } }, (err, res) => {
            if (err) { return err; }

            dbConnection.getDb().collection(id)
            .findOneAndUpdate({ _id: route.driverId },
                { $pull: { "Driver.routes": { fuel_Id: ObjectId(route.fuel_Id) } } }, (err, res) => {
                    if (err) { return err; }

                    if (route.type === 3 && route.full === 1 && route._id !== 0) {
                        calcRoute(id, truckId, route);
                    }
                }
            );
        }
    );
};

const calcRoute = (id, truckId, route) => {

    dbConnection.getDb().collection(id)
    .findOne({ _id: truckId }, (err, res) => {
        if (err) { return err; }
        if (!res) { return err; }
        addFuel(id, truckId, calcFuelDetails(truckId, route, res));
    });
};

const calcFuelDetails = (truckId, route, res) => {

    let findTrips = res.Truck.routes.filter(function (obj) {
        return obj.full === 1;
    });

    let endRoute = findTrips[findTrips.length - 1],
        startRoute = findTrips[findTrips.length - 2],
        totalRoute = endRoute.kmStop - startRoute.kmStop,
        startRouteNumber = res.Truck.routes.indexOf(startRoute),
        fuelArr = res.Truck.routes.slice(startRouteNumber + 1),
        fuel = 0;
    fuelArr.forEach(elem => { fuel += elem.litres; });

    let mediaReal = (fuel / totalRoute) * 100,
        arrRoutes = res.Truck.routes.slice(startRoute._id + 1),
        mediaRoute = 0,
        drivers = {};

    arrRoutes.forEach((obj, ind) => {
        let share = obj.trip / totalRoute;
        mediaRoute += share * obj.medTrip;
        drivers[obj.driverId] = share + (drivers[obj.driverId] || 0);
    });

    let driver = Object.keys(drivers).reduce((a, b) => { return drivers[a] > drivers[b] ? a : b; });
    let ratio = mediaReal / mediaRoute;

    return {
        mediaReal: Number(mediaReal.toFixed(2)),
        mediaRoute: Number(mediaRoute.toFixed(2)),
        _id: route.routeId,
        startRoute: startRoute.kmStop,
        endRoute: endRoute.kmStop,
        dtStart: startRoute.dtStop,
        dtStop: endRoute.dtStop,
        fuel: fuel,
        driver: driver,
        totalRoute: totalRoute,
        ratio: Number(ratio.toFixed(2)),
        truckId: truckId,
        fuel_Id: ObjectId(route.fuel_Id)
    };
};

const addFuel = (id, truckId, obj) => {
    dbConnection.getDb().collection(id)
    .findOneAndUpdate({ _id: truckId },
        { $push: { "Truck.fuel": obj } },
        { upsert: true })
        .then(() => {
            dbConnection.getDb().collection(id)
            .findOneAndUpdate({ _id: obj.driver },
                { $push: { "Driver.routes": obj } },
                { upsert: true })
                .catch(e => e);
        })
        .catch(e => e);
};

module.exports = {
    addRoute,
    calcFuelDetails
};
