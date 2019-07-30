const mongodb = require("mongodb");
	

const isValidId = (id) =>  mongodb.ObjectID.isValid(id);

const reqDataCheck = (reqData) => {
    let isValid = true;
    for (let key in reqData) {
      if(reqData[key] === undefined || reqData[key].length > 50 ) isValid = false;}
    return isValid;
  };

module.exports = {isValidId, reqDataCheck};