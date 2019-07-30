const dbConnection = require('../utils/dbConnection');

const toUpdate = async (data) => {
	try {
		const res = await dbConnection.getDb()
			.collection(data.collectionName)
			.findOneAndUpdate({ _id: data.id },
				{ $set: data.newData },
				{ returnOriginal: false });
		return res.value._id;
	}
	catch (e) { throw new Error(503); }
};

const toDelete = async data => {	
	try {
		const res = await dbConnection.getDb()
			.collection(data.collectionName)
			.findOneAndDelete({ _id: data.id });		
		return res.value._id;
	}
	catch (e) { throw new Error(503); }
};

module.exports = {
	toUpdate,
	toDelete
};