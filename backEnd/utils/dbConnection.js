const { MongoClient } = require('mongodb');
let url;
let _db;

const initDb = cb => {

	if (process.env.NODE_ENV !== "production") {
		url = process.env.url_test;
	} else {
		url = process.env.url;
	}

	if (_db) {
		return cb(null, _db);
	}
	MongoClient.connect(url)
		.then(client => {		
			_db = client.db();
			cb(null, _db);
		})
		.catch(err => cb(err));
};

const getDb = () => {
	if (!_db) {
		throw Error('Database not initialzed');
	}
	return _db;
};

module.exports = {
	initDb,
	getDb
};