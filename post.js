var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lpcases', { useMongoClient: true });
mongoose.Promise = global.Promise;

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
params = mixParams(params,[false,true],'iqHold');
params = mixParams(params,[false,true],'invalidAddress');
params = mixParams(params,[false,true],'iqresponse');
params = mixParams(params,[false,true],'isoSent');
params = mixParams(params,[false,true],'returnMails');
params = mixParams(params,[false,true],'vip');
params = mixParams(params,[false,true],'belowCostDiaries');
params = mixParams(params,[false,true],'belowCostDueDatePassed');

var lpcase = require('./model.js');

var cursor = lpcase.find({ }).cursor();
cursor.on('data', function(doc) {
  var item = _.clone(doc.toObject());
  delete item._id;
  delete item.__v;
  var objs = _.map(params,function(p) {
    return _.merge(item,p);
  })
  doc.remove();
  lpcase.insertMany(objs, {rawResult: true, ordered: false },function(err,docs) {
    if(err) {
      console.log(err)
    }else{
      console.log(`DOC ${doc.id} : Inserted ${docs.length}`)
    }
  })
});
cursor.on('close', function() {
  console.log('completed')
});
