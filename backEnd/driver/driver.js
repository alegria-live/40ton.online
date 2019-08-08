const dbConnection = require('../utils/dbConnection'),
	{Long} = require("mongodb"),
	Q = require("q");

/* returns array with the name of the driver
* and the average of real combustion or norm in a given period
* depending on param
*/
const driversFuelEfficiency = ({ collectionName, from, end, param }) => {
	from = Number(from);
	end = Number(end);
	let def = Q.defer();
	dbConnection.getDb().collection(collectionName)
		.aggregate([
			{ $match: { 'Driver.routes._id': { $gt: 0 } } },
			{
				$project: {
					_id: 0,
					driverName: { $concat: ['$Driver.lastName', ' ', '$Driver.name'] },
					selectedRoutes: {
						$filter: {
							input: '$Driver.routes',
							cond: { $and: [{ $gte: ['$$this.dtStop', from] }, { $lte: ['$$this.dtStop', end] }] }
						}
					}
				}
			},
			{ $match: { selectedRoutes: { $not: { $size: 0 } } } },
			{
				$project: {
					driverName: 1,
					realAvg: { $avg: `$selectedRoutes.${param}` }
				}
			},
			{ $sort: { 'realAvg': 1 } }
		]).toArray()
		.then(res => def.resolve(res))
		.catch(() => def.reject(503));
	return def.promise;
};

/* returns one driver with array of average real fuel consumption
* and norm for every route 
*/
const oneDriverData = async ({ collectionName, driverId }) => {
	try {
		const res = await dbConnection.getDb()
			.collection(collectionName)
			.aggregate([
				{ $match: { _id: driverId } },
				{ $unwind: '$Driver.routes' },
				{
					$group: {
						_id: { $concat: ['$Driver.lastName', ' ', '$Driver.name'] },
						mediaRealArr: { $push: '$Driver.routes.mediaReal' },
						mediaRouteArr: { $push: '$Driver.routes.mediaRoute' },
						datesArr: { $push: '$Driver.routes.dtStop' },
					}
				}
			]).next();
		return res;
	}
	catch (e) {return Promise.reject(503);}
};

/* returns drivers who have at least one route
* to select input filed of the one driver chart
*/
const activeDrivers = async ({ collectionName }) => {
	try {
		const res = await dbConnection.getDb()
			.collection(collectionName)
			.aggregate([
				{ $match: { "Driver.routes": { $elemMatch: { '_id': 1 } } } },
				{
					$project: {
						driverName: { $concat: ['$Driver.lastName', ' ', '$Driver.name'] }
					}
				},
				{ $sort: { driverName: 1 } }
			]).toArray();
		return res;
	}
	catch (e) {return Promise.reject(503);}
};

/* adds new driver to the company data base
*/
const addDriver = async (driver) => {
	const duplError = 'duplicate key error';
	driver.Driver.date = Long.fromString(driver.Driver.date.toString());
	try {
		const res = await dbConnection.getDb()
			.collection(driver.collectionName)
			.insertOne(
				{ _id: driver.id,  Driver: driver.Driver}
			);
		return {
			name: res.ops[0].Driver.name,
			lastName: res.ops[0].Driver.lastName,
			id: res.ops[0]._id
		};
	}
	catch (e) {
		if(e.message.indexOf(duplError) !== -1 ) { return Promise.reject(468);} 
		else return Promise.reject(503); 
	}
};

/* returns all company drivers for select input field in drivers edition form 
*/
const allDrivers = async (collectionName) => {
	try {
		const res = await dbConnection.getDb()
			.collection(collectionName)
			.aggregate([
				{ $match: { Driver: { $exists: true } } },
				{
					$project: {
						name: '$Driver.name',
						lastName: '$Driver.lastName'
					}
				}
			]).toArray();
		return res;
	}
	catch (e) { return Promise.reject(503); }
};

/* returns one driver for edition
*/
const find = async (collection, id) => {

	if (typeof collection !== "string" && collection.length !== 24) {
		return Promise.reject(404);
	}
	try {
		const res = await dbConnection.getDb()
			.collection(collection)
			.findOne({ _id: id });
		if (res === null) { return Promise.reject(404); }
		return res;
	}
	catch (e) { return Promise.reject(503); }
};

module.exports = {
	driversFuelEfficiency,
	oneDriverData,
	activeDrivers,
	addDriver,
	allDrivers,
	find
};