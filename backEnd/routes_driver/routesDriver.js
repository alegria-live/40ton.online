const express = require("express"),
    users = require("../users"),
    driver = require("../driver/driver.js"),
    addRoutes = require("../system/addRoutes.js"),
    router = express.Router(),
    csrf = require('csurf'),
    csrfProtection = csrf({ cookie: true }),
    app = express();

router.get("/:id", csrfProtection, (req, res) => {
    let env = app.get("env");
    if (app.get("env") === "production") { env = null; }
    users.find({ id: req.params.id })
        .then(data => {
            res.status(200).render("driver", {
                title: "Panel kierowcy",
                csrfToken: req.csrfToken(),
                env
            });
        })
        .catch(data => { res.status(500).render("drivererror"); });
});

router.post("/:id", (req, res) => {
    if (!req.body.add) {
        driver.find(req.params.id, req.body.id)
            .then(data => {
                if (Object.keys(data).indexOf("Driver") > 0) {
                    data = {
                        driverId: data._id, name: data.Driver.name,
                        lastName: data.Driver.lastName
                    };
                } else {
                    if (!(data.Truck.routes).length) {
                        data = {
                            truckId: data._id,
                            tripId: 0,
                            lastRoute: {}
                        };
                    }
                    else {
                        data = {
                            truckId: data._id,
                            tripId: (data.Truck.routes).length,
                            lastRoute: data.Truck.routes[(data.Truck.routes).length - 1]
                        };
                    }
                }
                res.status(200); res.json(data); return;
            })
            .catch(data => { res.status(500); res.json(data.msg); });
    }
    else {
        addRoutes.addRoute(req.params.id, req.body)
            .then(data => {
                data = {
                    truckId: data.value._id,
                    tripId: (data.value.Truck.routes).length,
                    lastRoute: data.value.Truck.routes[(data.value.Truck.routes).length - 1]
                };
                res.status(200); res.json(data); return;
            })
            .catch(data => { res.json(data.msg); });
    }
});

module.exports = router;