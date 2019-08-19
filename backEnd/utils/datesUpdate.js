// update dates  trucks and drivers for SYSTEM DEMO SYSTEMU 
// tr get utils/datesUpdate/5abe7f8502c2b31f844fcc44 only local !!!!!
const dbConnection = require('../utils/dbConnection'),
	Q = require("q");

let collection = "",
	items = [],
	truckFuelArr = [],
	truckRoutesArr = [],
	driverRoutesArr = [];

function getItems() {
	let def = Q.defer();
	dbConnection.getDb().collection(collection)
	.aggregate([{$project: {_id: 1}}]).toArray((err, res) => {
		if(err) {def.reject(err);}
			res.forEach(elem => {
				items.push(elem._id);
			});
		def.resolve();
	});
	return def.promise;
}

function getFuelDates(id) {
	let def = Q.defer();	
	dbConnection.getDb().collection(collection)
		.findOne({_id: id}, (err, res) => {
			if(err) {def.reject(err);}
			if(typeof res.Truck === "object") {
				truckRoutesArr = res.Truck.routes;
				truckFuelArr = res.Truck.fuel;
				def.resolve("truck");
			}
			if(typeof res.Driver === "object") {
				driverRoutesArr = res.Driver.routes;
				def.resolve("driver");
			}					
		});
	return def.promise;
}

function updateTruckRoutesDates(id, data) {	        
	dbConnection.getDb().collection(collection)
	.findOneAndUpdate({_id:id}, {$set:{"Truck.routes":data}},
		{returnOriginal: false}, (err, res) => {
		if(err) {return console.log(err);}			
	});		
}

function updateTruckFuelDates(id, data) {
	dbConnection.getDb().collection(collection)
	.findOneAndUpdate({_id:id}, {$set:{"Truck.fuel":data}},
		{returnOriginal: false}, (err, res) => {
		if(err) {return console.log(err);}
	});		
}

function updateDriverRoutesDates(id, data) {
	dbConnection.getDb().collection(collection)
	.findOneAndUpdate({_id:id}, {$set:{"Driver.routes":data}},
		{returnOriginal: false}, (err, res) => {
		if(err) {return console.log(err);}			
	});		
}

function changeDates(collName) {
	collection = collName;
	getItems()
	.then( dt => {
		items.forEach( item => {			
			getFuelDates(item)
			.then(data => {
				if(data === "truck") {
					truckRoutesArr.forEach((elem, i) => {						 
						//elem._id = i;
						//elem.dtStart = elem.dtStart + 86400000 * 7;
						//elem.dtStop = elem.dtStop + 86400000 * 7;
					// elem.dtStart = new Date(Number(new Date(elem.dtStart))).getTime();
					// elem.dtStop = new Date(Number(new Date(elem.dtStop))).getTime();
					});
					//updateTruckRoutesDates(item, truckRoutesArr);
					

					truckFuelArr.forEach((elem, i) => {
							//elem._id = i+1;
						elem.dtStart = elem.dtStart + 86400000 * 7;
						elem.dtStop = elem.dtStop + 86400000 * 7;
					// elem.dtStart = new Date(Number(new Date(elem.dtStart))).getTime();
					// elem.dtStop = new Date(Number(new Date(elem.dtStop))).getTime();		
					
					});
					//updateTruckFuelDates(item, truckFuelArr);
										
				}
				if(data === "driver") {
					driverRoutesArr.forEach((elem, i) => {
							//elem._id = i+1;
						elem.dtStart = elem.dtStart + 86400000 * 7;
						elem.dtStop = elem.dtStop + 86400000 * 7;
					// elem.dtStart = new Date(Number(new Date(elem.dtStart))).getTime();
					// elem.dtStop = new Date(Number(new Date(elem.dtStop))).getTime();		
					});
					//updateDriverRoutesDates(item, driverRoutesArr);					
				}			
			}).catch( err => console.log(err))

		});
	}).catch(err => console.log(err));
}

module.exports = {changeDates};