const dbConnection = require('../utils/dbConnection'),
	Q = require("q"),
	ObjectId = require('mongodb').ObjectId,
	validation = require("../utils/validation");
	
const delRoute = truck => {	
	let def = Q.defer();
		dbConnection.getDb()
		.collection(truck.collectionName)
		.findOne({_id: truck._id})
		.then(res => {
			const id = res.Truck.routes.length - 1;
			const lastRoute = res.Truck.routes[id];
			const data = {
				collectionName: truck.collectionName,
				truckId: truck._id,
				fuel_Id: lastRoute.fuel_Id,
				driverId: lastRoute.driverId,
				id
			};			
		def.resolve(deleteData(data));
		})
		.catch(e => def.reject(503));
	return def.promise;
};

const deleteData = data => {	
	let def = Q.defer();
	if (data.fuel_Id && validation.isValidId(data.fuel_Id)) {

		//delete calculated averages for Truck and Driver if after trip was calculated
		dbConnection.getDb().collection(data.collectionName)
			.findOneAndUpdate(
				{ _id: data.truckId },
				{ $pull: { "Truck.fuel": { fuel_Id: ObjectId(data.fuel_Id) } } })
			.then(() => {
				dbConnection.getDb().collection(data.collectionName)
				.findOneAndUpdate(
					{ _id: data.driverId },
					{ $pull: { "Driver.routes": { fuel_Id: ObjectId(data.fuel_Id) } } })
				.catch(e => def.reject(503));
			})
			.catch(e => def.reject(503));
	}

	// delete trip of the route for the truck's _id
	dbConnection.getDb().collection(data.collectionName)
	.findOneAndUpdate(
		{ _id: data.truckId },
		{ $pull: { "Truck.routes": { _id: data.id } } })
	.then(res => def.resolve(res.value))
	.catch(e => def.reject(503));
	return def.promise;
};

module.exports = {
	delRoute: delRoute
};