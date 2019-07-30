/* eslint-disable no-undef */
/* eslint-disable no-global-assign */
const dbConnection = require('../utils/dbConnection'),
	{ ObjectId, Long } = require('mongodb'),
	bcrypt = require("bcrypt-nodejs"),
	Q = require("q"),
	validation = require("../utils/validation"),
	COLLECTION_NAME = "customers";

/**
 * Adds new system user checking if request user email or nip exist in customers
 * or request user email exist in workers
 * @param {Object} - object with user data to insert
 * @returns {UserData} - Returns fields name, email and _id of the user object
 * for nodemailer and response
 */
const addUser = user => {
	let def = Q.defer();
	const duplicateError = /E11000 duplicate key error collection/;
	user.dataSet.password = bcrypt.hashSync(user.dataSet.password, bcrypt.genSaltSync(9));
	user.dataSet.date = Long.fromString(user.dataSet.date.toString());
	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.insertOne(user.dataSet, { w: "majority", wtimeout: 2500, j: true })
		.then(res => def.resolve({ name, email, _id } = res.ops[0]))
		.catch(e => {
			if (duplicateError.test(e.message)) {
				def.reject({ error: 463 }); return;
			}
			def.reject({ error: 503 });
		});
	return def.promise;
};

const activUser = user => {
	if (!validation.isValidId(user.id)) { def.reject({ error: 465 }); return; }
	let def = Q.defer();
	const query = { _id: ObjectId(user.id) };
	const updateData = { $set: { activ: 1 } };
	const projection = { projection: { activ: 1, _id: 0 } };

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne(query, projection)
		.then(res => {
			if (!res) { def.reject({ error: 465 }); return; }
			if (res.activ === 1) { def.reject({ error: 466 }); return; }
			dbConnection.getDb()
				.collection(COLLECTION_NAME)
				.updateOne(query, updateData)
				.then(res => def.resolve(setCollection(user.id)))
				.catch(e => def.reject({ error: 503 }));
		})
		.catch(e => def.reject({ error: 503 }));
	return def.promise;
};

// Creates new collection for the user
const setCollection = collName => {
	let def = Q.defer();
	dbConnection.getDb()
		.createCollection(collName)
		.then(res => def.resolve(200))
		.catch(e => def.reject({ error: 503 }));
	return def.promise;
};

//finds user for edition
const findUser = id => {
	let def = Q.defer();
	
	if (!validation.isValidId(id.id)) {
		def.reject({ error: 465 });
		return;
	}
	const query = { _id: ObjectId(id.id) };
	const project = { projection: { _id: 0, password: 0, workers: 0 }};

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne(query, project)
		.then(res => {
			if (!res) { def.reject({ error: 465 }); return; }
			def.resolve(res);
		})
		.catch(e => def.reject({ error: 503 }));
	return def.promise;
};

//check whether the email exist in all database
// if yes - error 467, if not call fn putEditUser
const editUser = user => {	
	let def = Q.defer();
	
	if (!validation.isValidId(user._id)) {
		def.reject({ error: 465 });
		return;
	}

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne( { _id: ObjectId(user._id) })
		.then(res => {
			if (!res) { def.reject({ error: 465 }); return; }
			if (res.email !== user.dataSet.email) {
				dbConnection.getDb()
				.collection(COLLECTION_NAME)
				.findOne(
					{$or: [
						{ email: user.dataSet.email },
						{ "workers.email": user.dataSet.email }
					]})
					.then(res => {
						if (res) { def.reject({ error: 467 }); return; }
						def.resolve(putEditUser(user));
					})
					.catch(e => def.reject({ error: 503 }));
			}
			else {
				def.resolve(putEditUser(user));
			}
		})
		.catch(e => def.reject({error: 503}));
	return def.promise;
};

// put new user's data
const putEditUser = user => {
	let def = Q.defer();
	user.dataSet.password = bcrypt.hashSync(user.dataSet.password, bcrypt.genSaltSync(8));
	
	if (!validation.isValidId(user._id)) {
		def.reject({ error: 465 });
		return;
	}
	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOneAndUpdate(
			{ _id: ObjectId(user._id) },
			{ $set: user.dataSet },
			{ returnOriginal: false }
		)
		.then(res => def.resolve(200))
		.catch(e => def.reject({ error: 503 }));			
	return def.promise;
};

/**
 * Finds email adress from login request in customers collection
 * If no results then finds in customers workers document with checkUserInWorkers function
 * Compares the password of the found document with login request
 * Returns object contains _id, company name, permisson
 * @param {string} - email
 * @param {string} - password
 * @returns {Promise<CompanyData>}
 */
const checkUser = (email, password) => {
	let def = Q.defer();
	const query = { email: email };
	const projection = { projection: { password: 1, company: 1, activ: 1 } };

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne(query, projection)
		.then(res => {
			if (!res) {
				checkUserInWorkers(email, password)
					.then(res => def.resolve(res))
					.catch(err => def.reject(err));
				return;
			}
			if (!res.activ) { def.reject({ error: 464 }); return; }
			if (!bcrypt.compareSync(password, res.password)) {
				def.reject({ error: 461 });
				return;
			}
			def.resolve({ _id: res._id, company: res.company, permission: 1 });
		})
		.catch(err => def.reject({ error: 503 }));
	return def.promise;
};

const checkUserInWorkers = (email, password) => {
	let def = Q.defer();
	const query = { 'workers.email': email };
	const projection = { projection: { 'workers.email.$': 1, password: 1, company: 1, workers: 1 } };

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne(query, projection)
		.then(res => {
			if (!res) { def.reject({ error: 461 }); return; }
			if (!bcrypt.compareSync(password, res.workers[0].password)) {
				def.reject({ error: 461 });
				return;
			}
			def.resolve({ _id: res._id, company: res.company, permission: 0 });
		})
		.catch(err => { def.reject({ error: 503 }); });
	return def.promise;
};

// delete main user
const delUser = user => {
	let def = Q.defer();
	
	if (!validation.isValidId(user._id)) {
		def.reject({ error: 400 });
		return;
	}
	
	dbConnection.getDb().collection(user._id).drop();
	
	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.remove(
			{ _id: ObjectId(user._id) },
			{ justOne: true }
		)
		.then(res => def.resolve(200))
		.catch(e => def.reject({ error: 503 }));		
	return def.promise;
};

// change users's password
const chPsw = data => {
	let def = Q.defer(),
		newPsw = new Date().getTime(),
		newPswBc = bcrypt.hashSync(newPsw, bcrypt.genSaltSync(8));

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOneAndUpdate(
			{ email: data.email },
			{ $set: { password: newPswBc } })
		.then(res => {
			if (res.value === null) { def.reject({ error: 462 }); return; }
			def.resolve({
				email: res.value.email,
				password: newPsw,
				name: res.value.name
			});
		})
		.catch(e => def.reject({ error: 503 }));
	return def.promise;
};

// add new company's worker, checking if the email exist in all database
const addWorker = (worker) => {

	let def = Q.defer();
	worker.dataSet.password = bcrypt
		.hashSync(worker.dataSet.password, bcrypt.genSaltSync(8));

	if (!validation.isValidId(worker.mainUserId)) {
		def.reject({ error: 465 }); return;
	}

	dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne({
			$or: [
				{ email: worker.dataSet.email },
				{ "workers.email": worker.dataSet.email }
			]
		})
		.then(res => {

			if (res) { def.reject({ error: 467 }); return; }

			dbConnection.getDb()
				.collection(COLLECTION_NAME)
				.findOneAndUpdate(
					{ _id: ObjectId(worker.mainUserId) },
					{ $push: { workers: worker.dataSet } },
					{ upsert: true, returnOriginal: false }
				)
				.then(res => {
					const name = res.value.workers[res.value.workers.length - 1].name;
					const lastName = res.value.workers[res.value.workers.length - 1].lastName;
					def.resolve(name + ' ' + lastName);
				})
				.catch(e => def.reject({ error: 503 }));
		})
		.catch(e => def.reject({ error: 503 }));
	return def.promise;
};

//returns workers array with name, email, lastName
const getWorkers = async data => {
		
	const query = {
		"_id": ObjectId(data.collectionName),
		"workers.0": { $exists: true }
	};
	const projetc = {
		projection: { 'workers': 1, _id: 0 }
	};

	if (!validation.isValidId(data.collectionName)) {
		def.reject({ error: 465 }); return;
	}
	
	try {
		const res = await dbConnection.getDb()
		.collection(COLLECTION_NAME)
		.findOne(query, projetc);
		if(!res) return [];
		return res.workers.map(elem => {
			delete elem['password'];
			return elem;
		});
	}
	catch (e) { throw new Error(503); }	
};

const editWorker = async worker => {	
	worker.newData.password = bcrypt
		.hashSync(worker.newData.password, bcrypt.genSaltSync(8));
	
	if (!validation.isValidId(worker.collectionName)) {
		def.reject({ error: 465 });
		return;
	}
	try {
			const res = await dbConnection.getDb()
			.collection(COLLECTION_NAME)
			.findOne({ $or: [
				{ email: worker.newData.email },
				{ "workers.email": worker.newData.email }
			]});
			if(res && worker.id !== worker.newData.email) {
				throw new Error(467);
			}
			else {
				return await putEditWorker(worker);
			}
		}
		catch (e) { throw new Error(e.message || 503); }
	};

	const putEditWorker = async worker => {
		try {
			const res = await dbConnection.getDb()
				.collection(COLLECTION_NAME)
				.findOneAndUpdate(
					{'workers.email': worker.id},
					{$set: {'workers.$': worker.newData}},
					{ upsert: true, returnOriginal: false }
					);
				const Worker = res.value.workers.find(elem => elem.email === worker.newData.email);
				return(Worker.name + ' ' + Worker.lastName);
		}
		catch (e) { throw new Error(503); }
	};
	
const delWorker = async worker => {
	
	if (!validation.isValidId(worker.collectionName)) {
		def.reject({ error: 465 });
		return;
	}
	try {
		const res = await dbConnection.getDb()
			.collection(COLLECTION_NAME)
			.findOneAndUpdate(
			{ _id: ObjectId( worker.collectionName ) },
			{ $pull: 
				{ workers: { email: worker.id } }
			});
			return res.ok;
	}
	catch (e) { throw new Error(503); }
};

module.exports = {
	addUser,
	activUser,
	addWorker,
	checkUser,
	findUser,
	editWorker,
	getWorkers,
	delWorker,
	editUser,
	delUser,
	chPsw
};