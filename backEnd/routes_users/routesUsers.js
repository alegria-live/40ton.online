/* eslint-disable no-console */
const express = require("express"),
    emailer = require("../utils/nodemailer"),
    users = require("../users"),
    jwt = require('jsonwebtoken'),
    { reqDataCheck } = require('../utils/validation'),
    router = express.Router();

/**
 * Adds new system main user
*/
router.post("/user", async (req, res) => {
    if (req.app.get("dbError")) { 
        return res.status(503).json(503);
    }
    if (!reqDataCheck(req.body.dataSet)) {
        return res.status(404).json(465);
    }
    try {
        const data = await users.addUser(req.body);
        const hashedId = jwt.sign(data._id.toString(), process.env.JWT_CODE);
        emailer.activation(data.email, hashedId, data.name)
            .then(dt => {
                res.append('_gcn', hashedId).json(dt);
            })
            .catch(e => res.status(503).json(e));
    }
    catch (e) { res.status(500).json(e); }
});

router.get("/users/findUser", (req, res) => {
    req.body.id = req.cookies._gcn;
    users.findUser(req.body)
        .then(data => res.json(data))
        .catch(e => res.status(500).json(e));
});

router.put("/users/", (req, res) => {
    req.body._id = req.cookies._gcn;
    users.editUser(req.body)
        .then(data => res.json(data))
        .catch(e => res.status(500).json(e));
});

router.delete("/users/", (req, res) => {
    req.body._id = req.cookies._gcn;
    users.delUser(req.body)
        .then(data => res.json(data))
        .catch(e => res.status(500).json(e));
});

router.put("/user/psw", (req, res) => {
    users.chPsw(req.body)
        .then(data => {
            emailer.emailChPsw(data.email, data.password, data.name)
                .then(dt => res.json(dt))
                .catch(dt => res.status(500).json(dt));
        })
        .catch(e => res.status(500).json(e));
});

router.post('/workers/addWorker', async (req, res) => {
    req.body.mainUserId = req.cookies._gcn;
    try {
        const worker = await users.addWorker(req.body);
        res.json(worker);
    }
    catch (e) { res.status(500).json(e); }
});

router.get("/workers/getWorkers", (req, res) => {
    req.body.collectionName = req.cookies._gcn;
    users.getWorkers(req.body)
    .then(data => res.json(data))
        .catch(e => res.status(500).json(e));
});

router.put("/workers/editWorker", (req, res) => {
    req.body.collectionName = req.cookies._gcn;
    users.editWorker(req.body)
        .then(data => res.json(data))
        .catch(e => { res.status(500).json(e);});
});

router.delete("/workers/delWorker", (req, res) => {
    req.body.collectionName = req.cookies._gcn;
    users.delWorker(req.body)
        .then(data => res.json(data))
        .catch(e => res.status(500).json(e));
});
module.exports = router;
