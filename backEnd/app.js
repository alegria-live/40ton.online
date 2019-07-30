const cluster = require("cluster");
require('dotenv').load();

if(cluster.isMaster && process.env.NODE_ENV === 'production') {
    let cpus = require("os").cpus().length;
    for(let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on("exit", function() {       
        cluster.fork();
    });   
}
else {	
	const express = require("express"),
		hbs = require("express-handlebars"),
		db = require("./utils/dbConnection"),
		app = express();

	app.engine("handlebars", hbs({defaultLayout: "main"}));
	app.set("view engine", "handlebars");
	app.set("x-powered-by", false);
	require("./middlewares/middlewares.js")(app);
	app.set("env", process.env.NODE_ENV);

	db.initDb((err, db) => {
		if (err) {			
			app.set("dbError", true);}
		app.listen(process.env.PORT || 8000, function() {
			if(app.get("env") !== "production") console.log("8000");
		});
	});
	module.exports.app = app;
}

