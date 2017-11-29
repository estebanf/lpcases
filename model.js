var mongoose = require('mongoose');

var lpcase = mongoose.model('lpcase', {
  source: String,
  status: String,
  clientId: Number,
  fundingSource: String,
  benefitAmount: Number,
  score: Number,
  isoInd: Number,
  daysFromAccident: Number,
  isoResp: String,
  letters: Number,
  daysSinceLetter: Number,
  iqHold: Boolean,
  invalidAddress: Boolean,
  iqresponse: Boolean,
  isoSent: Boolean,
  returnMails: Boolean,
  vip: Boolean,
  belowCostDiaries: Boolean,
  belowCostDueDatePassed: Boolean
});

module.exports = lpcase;
