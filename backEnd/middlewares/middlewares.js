const express = require("express"),
    fs = require('fs'),   
    cookieParser = require('cookie-parser'),
    csrf = require('csurf'),
    bodyParser = require("body-parser"),     
    routes_users = require("../routes_users"),
    routes_driver = require("../routes_driver"),
    routes_system = require("../routes_system"),
    jwt = require('jsonwebtoken'),    
    csrfProtection = csrf({ cookie: true }),
    parseForm = bodyParser.urlencoded({ extended: false }),
    app = express();
   
let publicCat = "public_dev";
if(app.get('env') === "production") {publicCat = "public";}

process.on('uncaughtException', (err) => {
    fs.appendFileSync('logss.txt', new Date() + ' ' + err.stack + '\n');
});

module.exports = (app) => {   
    app.use(express.static(publicCat));
    app.use(cookieParser());
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        if(req.body.collectionName) {        
            req.body.collectionName = jwt.verify(req.body.collectionName, process.env.JWT_CODE);
        }        
        next();
    });
    app.use("/login", parseForm, csrfProtection,(err, req, res, next) => {
        if(err) {res.status(401); res.json(400); return;}
        next();
    });
    app.use("/sendForm", parseForm, csrfProtection,(err, req, res, next) => {
        if(err) {res.status(403); res.json(400); return;}
        next();
    });
    app.use("/api/user", parseForm, csrfProtection,(err, req, res, next) => {            
        if(err) {res.status(403); res.json(400); return;}
        next(app);
    });
    app.use("/driver/:id", parseForm, csrfProtection,(err, req, res, next) => {
        if(err) {res.status(403); res.json(400); return;}
        next();
    });

    require("../log/logins.js")(app);
    app.use("/api", routes_users);
    app.use("/driver", routes_driver);    
    app.use("/system", routes_system);    
    
    require("../routes_others/others_routes.js")(app);
};

