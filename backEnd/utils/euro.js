const superagent = require('superagent'),
  dbConnection = require('../utils/dbConnection'),
  ObjectId = require('mongodb').ObjectId,
  REGISTRY  = process.env.REGISTRY,
  REGISTRY_ID = process.env.REGISTRY_ID;

function check() {
  superagent.get("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml")
  .end((e, resp) => {if(e) {return;}
    let pln = resp.text.indexOf("PLN");
    let euro = resp.text.slice(pln+11, pln+17);
    pushEuro(euro);
  });
}
function pushEuro(euro) {
    dbConnection.getDb().collection(REGISTRY)
    .findOneAndUpdate({_id:ObjectId(REGISTRY_ID)},
      {$push :{exchange: {"euro":euro, date: new Date()}}},
      (err, res) => {if(err){return err;}
    }); 
}
module.exports = {check};