var express = require('express');
var util = require('../common/util')();
var Logger = require('../common/logger');
var logger = Logger();
var applicationModel = require('../models/application');
var router = express.Router();
var options = require('../config');

function getErrReturn(err, data) {
  if (typeof(data.code) == "undefined") {
    data.code = 10001000;
  }
  var returnData = {
    'code': data.code,
    'msg': err || data.data
  };
  return returnData;
}

function getNormalReturn(err, data) {
  if (typeof(data.code) == "undefined") {
    data.code = 0;
  }
  var returnData = {
    'code': data.code,
    'data': data.data
  };
  return returnData;
}

function getReturn(err, data) {
  if (err) {
    returnData = getErrReturn(err, data);
  } else {
    returnData = getNormalReturn(err, data);
  }
  return returnData;
};
// router.post('/question', function(req, res, next) {
//   var answer = req.body.answer;
//   console.log(typeof answer)
//   logger.traceIn('received post req: ' + answer);
//   if (typeof(answer) != 'string') {
//     res.send(getReturn('some params miss or type err', {}));
//     logger.error('some params miss or type err');
//     return;
//   }
//   applicationModel.question(answer, function(err, data) {
//     var result = getReturn(err, data);
//     res.send(result);
//   });
// });

router.get('/weixin', function(req, res, next) {
  console.log('weixin');
  var url = req.query.url;
  console.log(url);
  applicationModel.weixin(url, function(err, data) {
    var result = getReturn(err, data);
    res.send(result);
  });
});
module.exports = router;
