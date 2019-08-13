const emailer = require("../utils/nodemailer"),
    users = require("../users"),
    euroxml = require("../utils/euro"),
    datesUpdate = require("../utils/datesUpdate"),
    orders = require("../system/orders"),
    jwt = require('jsonwebtoken'),
    csrf = require('csurf'),
    csrfProtection = csrf({ cookie: true });

module.exports = function (app) {

    //set app language depending on the client choice
    app.get("/:lang", csrfProtection, (req, res) => {
        global.language = req.params.lang;
        let env = app.get("env");
        if (env === "production") { env = null; }
        res.json({
            _csrf: req.csrfToken(),
            env
        });
    });

    // user activation
    app.put("/activation", (req, res) => {

        if (app.get("dbError")) {
            res.status(500).json(503); return;
        }
        try {
            req.body.id = jwt.verify(req.body.id, process.env.JWT_CODE);
            users.activUser(req.body)
                .then(data => res.json(data))
                .catch(data => { res.status(503).json(data); });
        }
        catch (e) {
            res.status(500).json(465);
        }
    });

    // sends client message from page contact form
    app.post("/sendForm", (req, res) => {

        if (app.get("dbError")) {
            res.status(503).json(503); return;
        }

        if (!req.body.name || !req.body.email || !req.body.content) {
            res.status(500).json(465);
            return;
        }

        emailer.sendForm(req.body)
            .then(data => { return res.json(data); })
            .catch(data => { res.status(503).json(data); });
    });

    //receive confirmation from payment system and send response 'OK'
    app.post("/confirm", (req, res) => {
        orders.confirmation(req.body)
            .then(data => { res.send('OK'); })
            .catch(data => { res.status(500).json(data); });
    });

    // add euro currency in registry collection
    app.get("/utils/euro", (req, res) => {
        euroxml.check();
        res.send("check.Ok");
    });
    //update trucks routes dates - only local
    app.get("/utils/datesUpdate/:collection", (req, res) => {
        datesUpdate.changeDates(req.params.collection);
        res.send("Update Dates - Ok");
    });
};