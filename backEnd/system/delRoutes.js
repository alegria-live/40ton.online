const dbConnection = require('../utils/dbConnection'),
	Q = require("q"),
	ObjectId = require('mongodb').ObjectId,
	validation = require("../utils/validation");
	
function delRoute(data) {	
	let def = Q.defer();	
		if(data.fuel_Id && validation.isValidId(data.fuel_Id)) {

			//deleting calculated medials for Truck and Driver if after trip was calculated
			dbConnection.getDb().collection(data.collectionName).findOneAndUpdate({_id: data.truckId},
			{$pull: {"Truck.fuel": {fuel_Id: ObjectId(data.fuel_Id)}}}, (err, res) => {
				if(err) {def.reject({msg: 400}); return;}
				
				dbConnection.getDb().collection(data.collectionName).findOneAndUpdate({_id: data.driverId},
				{$pull: {"Driver.routes": {fuel_Id: ObjectId(data.fuel_Id)}}}, (err, res) => {
				if(err) {def.reject({msg: 400}); return;}				
				});
			});			
		}
		
		// deleting trip of the route for the truck's _id
		dbConnection.getDb().collection(data.collectionName).findOneAndUpdate({_id: data.truckId},
			{$pull: {"Truck.routes": {_id: data.id}}}, (err, res) => {
				if(err) {def.reject({msg: 400}); return;}
				def.resolve(res.value);				
			});
	return def.promise;
}
module.exports = {
	delRoute: delRoute
};