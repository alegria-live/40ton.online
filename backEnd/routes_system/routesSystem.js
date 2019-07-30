const express = require("express"),
  router = express.Router(),
  url = require("url"),
  querystring = require("querystring"),
	addRoutes = require("../system/addRoutes"),
	delRoutes = require("../system/delRoutes"),
    driver = require("../driver/driver"),
    truck = require("../system/truck"),
    update = require("../system/update"),
    orders = require("../system/orders"),
    emailer = require("../utils/nodemailer");

router.get("/owner", (req, res) => {       
    res.json({perm: req.session.perm});
});

router.get("/activeDrivers", async (req, res) => {
  try {
    const data = await driver.activeDrivers({collectionName: req.cookies._gcn});   
    res.json(data);
  }
  catch (e) {res.status(500).json(e.message);}
});

router.get("/driversFuelEfficiency", (req, res) => {
  const from = querystring.parse(url.parse(req.url).query).from;
  const end = querystring.parse(url.parse(req.url).query).end;
  const param = querystring.parse(url.parse(req.url).query).param;
  
  driver.driversFuelEfficiency({collectionName: req.cookies._gcn, from, end, param})
  .then(data => res.json(data))
  .catch(data => res.status(500).json(data));
});

router.get("/oneDriverData", async (req, res) => {  
  const driverId = querystring.parse(url.parse(req.url).query).driverId;
  try {
    const data = await driver.oneDriverData({collectionName: req.cookies._gcn, driverId});
    res.json(data);
  }
  catch (e) {res.status(500).json(e.message);} 
});

router.get("/activeTrucks", async (req, res) => {
  try {
    const data = await truck.activeTrucks({collectionName: req.cookies._gcn});  
    res.json(data);
  }
  catch (e) {res.status(500).json(e.message);}
});

router.get("/trucksFuelEfficiency", (req, res) => {  
  const from = querystring.parse(url.parse(req.url).query).from;
  const end = querystring.parse(url.parse(req.url).query).end;
  const param = querystring.parse(url.parse(req.url).query).param;
  
  truck.trucksFuelEfficiency({collectionName: req.cookies._gcn, from, end, param})
  .then(data => res.json(data))
  .catch(data => res.status(500).json(data));
});

router.get("/oneTruckData", async (req, res) => {  
  const truckId = querystring.parse(url.parse(req.url).query).truckId;
  try {
    const data = await truck.oneTruckData({collectionName: req.cookies._gcn, truckId});
    res.json(data);
  }
  catch (e) {res.status(500).json(e.message);} 
});

router.get("/truckRoutes", async (req, res) => {
  const truckId = querystring.parse(url.parse(req.url).query).truckId;
  try {
    const data = await truck.truckRoutes({collectionName: req.cookies._gcn, truckId});
    res.json(data);
  }
  catch (e) { res.status(500).json(e.message);
  }
});

router.post("/addDriver", (req, res) => {
  req.body.collectionName = req.cookies._gcn;
  driver.addDriver(req.body)
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e.message));
});

router.get("/allDrivers", (req, res) => {
  const collectionName = req.cookies._gcn;
  driver.allDrivers(collectionName)
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e.message));
});

router.put("/update", (req, res) => {
  req.body.collectionName = req.cookies._gcn;
  update.toUpdate(req.body)
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e.message));
});

router.delete("/update", (req, res) => {  
  req.body.collectionName = req.cookies._gcn;
  update.toDelete(req.body)
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e.message));
});

router.post("/addTruck", (req, res) => {
  req.body.collectionName = req.cookies._gcn;
  truck.addTruck(req.body)
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e.message));
});

router.get("/allTrucks", (req, res) => {
  req.body.collectionName = req.cookies._gcn;
  truck.allTrucks(req.body)
  .then(data => {res.status(200); res.json(data); return; })
  .catch(e => {res.status(500); res.json(e.message);});
});



router.post("/owner/:id", (req, res) => {
    addRoutes.addRoute(req.params.id, req.body)
    .then(data => {        
        data = {
            truckId: data.value._id,
            tripId: (data.value.Truck.routes).length,
            lastRoute: data.value.Truck.routes[(data.value.Truck.routes).length-1]
        };
        res.status(200); res.json(data); return;})
    .catch(data => {res.status(500).json(data);});
});

router.delete("/owner/delRoute", (req, res) => {
    delRoutes.delRoute(req.body)
    .then(data => {        
        data = { truckId: data._id};
        res.status(200); res.json(data); return;})
    .catch(data => {res.status(500).json(data);});
});




// router.post("/findTrucks", (req, res, next) => {        
//         truck.findTrucks(req.body)
//         .then(data => {res.status(200); res.json(data); return; })
//         .catch(data => {res.status(500); res.json(data.msg);});           
// });



router.put("/theft", (req, res) => {
    truck.theft(req.body)
    .then(data => {res.status(200); res.json(data.msg); return; })
    .catch(data => {res.status(500); res.json(data.msg);});
});

  router.post("/order", (req, res) => {  
    orders.order(req.body)
    .then(data => {
        emailer.sendOrder(data.email, data.number, data.name)
        .then(dt => {res.json(data); return;})
        .catch(dt => {res.status(500); res.json(dt.msg);});
    })
    .catch(data => {res.status(500); res.json(data.msg);});
  });

  router.post("/orders", (req, res) => {
   orders.getOrders(req.body)
    .then(data => {res.status(200); res.json(data); return; })
    .catch(data => {res.status(500); res.json(data.msg);});
  });

module.exports = router;