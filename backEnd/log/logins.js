const sessions = require("client-sessions"),
    users = require("../users"),
    jwt = require('jsonwebtoken'),
    authenticate = require("../middlewares/authenticate"); 

module.exports = function(app) {
    
    const duration = 14 * 60 * 60 * 1000; 
    
    app.use(sessions({
        cookieName: "session",
        secret: process.env.SESSION_CODE,
        duration: duration
    }));

    app.post("/login", async (req, res) => {

        if(app.get("dbError")) {res.status(503).json({msg: 503}); return;}
        if(!req.body.email || !req.body.password){
            res.status(404);
            res.json({msg: 461});
            return;
        }
        try {
            const data = await users.checkUser(req.body.email, req.body.password);
            const hashedId = jwt.sign(data._id.toString(), process.env.JWT_CODE);
            const demo = process.env.E2E_TEST_EMAIL === req.body.email ? true : false;            
            req.session.user = data.company;
            req.session.perm = data.permission;            
            req.session._id = data._id.toString();            
            res.status(202);
            res.cookie('_gcn',data._id.toString(), { maxAge: duration, httpOnly: false });            
            res.json({
                token: hashedId,
                company: data.company,
                perm: data.permission,
                expiredTime: duration,
                demo});
        } catch (e) {
            req.session.reset();
            res.status(503);
            res.json(e);
        }      
    });

    app.get("/logout", (req,res) => {        
        req.session.reset();
        return res.redirect("/");
    });
    app.use("/system", authenticate);
    app.use("/api/workers",authenticate);
    app.use("/api/users", authenticate);
};