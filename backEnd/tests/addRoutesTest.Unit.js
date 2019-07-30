const { calcFuelDetails } = require('../system/addRoutes');
const expect = require('expect');

const truckId = 'testTruck',
      route = { fuel_Id: '5c4ac7eb953d110a800eb22c', routeId: 1 },
      res = { _id: 'testTruck',
            Truck:
              {                                 
                routes:
                [ {
                  "_id" : 0,
                  "dtStop" : "2019-03-21",
                  "kmStop" : 0,
                  "full" : 1 
                },
                {
                  "_id" : 1,
                  "driverId" : "testDriver",
                  "type" : 1,                 
                  "dtStop" : "2019-03-21",
                  "kmStop" : 50,
                  "full" : 0,
                  "litres": 0,
                  "fuel_Id" : -1,
                  "kmStart" : 0,
                  "trip" : 50,
                  "medTrip" : 24
                },
                {
                  "_id" : 2,
                  "driverId" : "testDriver",
                  "type" : 2,                 
                  "dtStop" : "2019-03-21",
                  "kmStop" : 100,
                  "full" : 0,
                  "litres": 0,
                  "fuel_Id" : -1,
                  "kmStart" : 50,
                  "trip" : 50,
                  "medTrip" : 48
                },
                {
                  "_id" : 3,
                  "driverId" : "testDriver",
                  "type" : 3,            
                  "dtStop" : "2019-03-21",
                  "kmStop" : 200,
                  "full" : 1,
                  "fuel_Id" : '5c4ac7eb953d110a800eb22c',
                  "kmStart" : 100,
                  "trip" : 100,
                  "medTrip" : 24
                }]
              }
            };

describe('- addRoutes module - calculations test', () => {

  it('Single route fuel calculation for 200 l/200 km expect ratio === 3.33', () => {
    
    res.Truck.routes[3].litres = 200;

    let outputObj = calcFuelDetails(truckId, route, res);
    expect(outputObj.ratio).toBe(3.33);
  });

  it('Single route fuel calculation for 60 l/200 km expect ratio === 1', () => {
    
    res.Truck.routes[3].litres = 60;
               
    let outputObj = calcFuelDetails(truckId, route, res);
    expect(outputObj.ratio).toBe(1);
  });

  it('Single route fuel calculation for 20 l/200 km expect ratio === 0.33', () => {
    
    res.Truck.routes[3].litres = 20;
               
    let outputObj = calcFuelDetails(truckId, route, res);
    expect(outputObj.ratio).toBe(0.33);
  });

  it('Single route fuel calculation for 0 l/100 km expect ratio === 0', () => {
    
    res.Truck.routes[3].litres = 0;
               
    let outputObj = calcFuelDetails(truckId, route, res);
    expect(outputObj.ratio).toBe(0);
  });

});
