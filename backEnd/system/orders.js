const dbConnection = require('../utils/dbConnection'),
    ObjectId = require('mongodb').ObjectId,
    Q = require("q"),
    REGISTRY = process.env.REGISTRY,
    REGISTRY_ID = process.env.REGISTRY_ID,
    COLLECTION_NAME = process.env.COLLECTION_NAME,
    validation = require("../utils/validation");

// create order number
// push the order to registry orders and to customer orders and send resolve
// to send order to the pay system   

const order = data => {

    let def = Q.defer();

    if (!validation.isValidId(data._id)) {
        return Promise.reject(400);
    }

    dbConnection.getDb().collection(REGISTRY)
        .findOne({}, (err, res) => {
            if (err) { def.reject(400); return; }
            data.dataSet.number = (new Date()).toISOString().slice(0, 10) + "/" + res.orders.length;

            dbConnection.getDb().collection(REGISTRY)
            .findOneAndUpdate({ _id: ObjectId(REGISTRY_ID) },
                { $push: { orders: data.dataSet } }, (err, res) => {
                    if (err) { def.reject(400); return; }

                    dbConnection.getDb().collection(COLLECTION_NAME)
                    .findOneAndUpdate({ _id: ObjectId(data._id) },
                        { $push: { orders: data.dataSet } }, { returnOriginal: false }, (err, res) => {
                            if (err) { def.reject(400); return; }
                            if (res.value === null) { def.reject(400); return; }

                            let order = res.value.orders[(res.value.orders).length - 1];
                            def.resolve(order);
                        }
                    );
                }
            );
        });
    return def.promise;
};
// recive confirmation from pay system and push to registry confirm
// send to the pay sytem OK and call afterConfirm
const confirmation = data => {
    let def = Q.defer();
    if (data.operation_status === "completed" && data.operation_type === "payment") {
        dbConnection.getDb().collection(REGISTRY)
        .findOneAndUpdate(
            { _id: ObjectId(REGISTRY_ID) },
            { $push: { confirm: data } }, (err, res) => {
                if (err) { def.reject(400); return; }
                def.resolve(res);
                afterConfirm(data);
            });
        return def.promise;
    }
};

// set state of order to 1 in registry and in customer
// call incrTruck

const afterConfirm = param => {

    dbConnection.getDb().collection(REGISTRY)
        .findOne({ _id: ObjectId(REGISTRY_ID) }, (err, res) => {
            if (err) { return Promise.reject(err); }
            if (!res) { return  Promise.reject(400); }
            let indexReg = res.orders.indexOf(res.orders.find(e => {
                return e.orderId === param.control;
            }));
            if (res.orders[indexReg].state === 1) { return; }
            indexReg = `orders.${indexReg}.state`;
            dbConnection.getDb().collection(REGISTRY)
            .findOneAndUpdate(
                { _id: ObjectId(REGISTRY_ID) },
                { $set: { [indexReg]: 1 } }, (err, res) => {
                    if (err) { return Promise.reject(err); }
                });


            dbConnection.getDb().collection(COLLECTION_NAME)
                .findOne({ "orders.orderId": param.control }, (err, res) => {
                    if (err) { return Promise.reject(err); }
                    if (!res) { return Promise.reject(400); }
                    let indexCust = res.orders.indexOf(res.orders.find(e => {
                        return e.orderId === param.control;
                    }));
                    let indexCustText = `orders.${indexCust}.state`;
                    dbConnection.getDb().collection(COLLECTION_NAME)
                    .findOneAndUpdate({ "orders.orderId": param.control },
                        { $set: { [indexCustText]: 1 } }, (err, res) => {
                            if (err) { return Promise.reject(err); }
                            if (!res) { return Promise.reject(400); }
                            let trucksToUpdate = res.value.orders[indexCust].itemsDays;
                            let collection_id = String(res.value._id);
                            incrTrucks(collection_id, trucksToUpdate);
                        });
                });
        });
};

// increase subscription time

const incrTrucks = (collection_id, trucks) => {
    for (let key in trucks) {
        dbConnection.getDb().collection(collection_id)
        .findOneAndUpdate(
            { _id: key },
            { $inc: { "Truck.paid": trucks[key] * 86400000 } })
            .catch(e => e);
    }
};

// return all client's orders

const getOrders = user => {

    if (!validation.isValidId("user._id")) {
        return Promise.reject(400);       
    }
    let def = Q.defer();
    
    dbConnection.getDb().collection(COLLECTION_NAME)
        .findOne({ _id: ObjectId(user._id) })
        .then(res => {
            if (!res) { def.reject(400); return; }
            def.resolve(res.orders);
        })
        .catch(() => { def.reject(400); } );
    return def.promise;
};

module.exports = {
    order,
    getOrders,
    confirmation
};