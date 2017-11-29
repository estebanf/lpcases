var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lpcases', { useMongoClient: true });
mongoose.Promise = global.Promise;
var lpcase = require('./model.js');



function mixParams(obj,arr,name){
  var rObj = []
  if(obj.length == 0){
    rObj = _.map(arr,(a) => {
      var item = {};
      item[name] = a;
      return item;
    })
  }else{
    _.each(obj,(o) => {
      _.each(arr,(a) => {
        var item = _.clone(o);
        item[name] = a;
        rObj.push(item);
      })
    })
  }
  console.log(name + " : " + rObj.length);
  return rObj;
}
var params = [];
params = mixParams(params,['Manual','EDI'],'source');
params = mixParams(params,['Investigation','CWOC'],'status');
params = mixParams(params,[1,13,24,31,32],'clientId');
params = mixParams(params,['Other','Medicaid','Medicare'],'fundingSource');
params = mixParams(params,[500,1000],'benefitAmount');
params = mixParams(params,[20,40,50,70],'score');
params = mixParams(params,[0,1],'isoInd');
params = mixParams(params,[15,30],'daysFromAccident');
params = mixParams(params,['MISS','OTHER'],'isoResp');
params = mixParams(params,[0,1,2,3,4],'letters');
params = mixParams(params,[15,30,60],'daysSinceLetter');

// params = mixParams(params,[false,true],'iqHold');
// params = mixParams(params,[false,true],'invalidAddress');
// params = mixParams(params,[false,true],'iqresponse');
// params = mixParams(params,[false,true],'isoSent');
// params = mixParams(params,[false,true],'returnMails');
// params = mixParams(params,[false,true],'vip');
// params = mixParams(params,[false,true],'belowCostDiaries');
// params = mixParams(params,[false,true],'belowCostDueDatePassed');


lpcase.insertMany(params, function(err) {
  if(err) { console.log(err)}
  console.log('done');
})
console.log('here')
