var config = require('../config');
var https = require("https");
var sign = require("./sign");
var Logger = require('../common/logger');
var logger = Logger();
// var scoreMap = require('./scoremap');
// var v1 = require('./v1');
// var v2 = require('./v2');
var JSSDK = require('./jssdk');

var application = {
  // question: function(answer, callback) {
  //   var score = 0;
  //   var ability;
  //   var subject;
  //   var object;
  //   var willing;
  //   var percent;
  //   var level;
  //   var finallyLevel;
  //   var result = {
  //     data: 0,
  //     scores: []
  //   };
  //   var temp = 0;
  //   answer = answer.split("~");
  //   logger.info('answer length: ' + answer.length);
  //   result.scores[0] = answer[0];
  //   if (answer[0] == 'v1') {
  //     for (var index = 1, length = answer.length; index < length; index++) {
  //       if (index == 4) {
  //         temp = scoreMap.v1.common[answer[index]];
  //       }
  //       if (index == 5) {
  //         v1.scoreCompute(index, scoreMap.v1.five[temp + answer[index]], result);
  //       } else if (index == 7) {
  //         v1.scoreCompute(index, scoreMap.v1.seven[answer[index]], result)
  //       } else if (index == 8) {
  //         v1.scoreCompute(index, scoreMap.v1.eight[answer[index]], result);
  //       } else if (index == 9) {
  //         v1.scoreCompute(index, scoreMap.v1.nine[answer[index]], result)
  //       } else if (index == 11) {
  //         v1.scoreCompute(index, scoreMap.v1.eleven[answer[index]], result)
  //       } else {
  //         v1.scoreCompute(index, scoreMap.v1.common[answer[index]], result);
  //       }
  //       // console.log(index+"-"+scoreMap.v1.common[answer[index]]);
  //     }
  //     if (!result.err) {
  //       ability = v1.scoreAbility(result.scores);
  //       subject = v1.scoreSubject(result.scores);
  //       object = v1.scoreObject(result.scores);
  //       // console.log(subject+"-"+object),
  //       willing = v1.willingLevel(subject, object);
  //       level = scoreMap.v1.levelMap[willing * 10 + ability]
  //       score = level * 20;
  //       percent = v1.percentCompute(ability, willing, level, scoreMap.v1);
  //       result.data = {
  //         ability: ability,
  //         willing: willing,
  //         score: score,
  //         percent: percent
  //       };
  //     }
  //   } else if (answer[0] == 'v2') {
  //     if (answer.length == 11) {
  //       for (var index = 1, length = answer.length; index < length; index++) {
  //         v2.scoreCompute(index, scoreMap.v2[index][answer[index]], result);
  //         console.log(index + "-" + scoreMap.v2[index][answer[index]]);
  //       }
  //       if (!result.err) {
  //         subject = v2.scoreSubject(result.scores);
  //         object = v2.scoreObject(result.scores);
  //         console.log('subject: ' + subject + " - object " + object);
  //         level = scoreMap.v2.levelMap[object * 10 + subject][0];
  //         finallyLevel = v2.finallyLevel(answer, level);
  //         score = scoreMap.v2.score[finallyLevel];
  //         percent = v2.percentCompute(object, subject, level);
  //         result.data = {
  //           object: object,
  //           subject: subject,
  //           score: score,
  //           percent: percent
  //         };
  //       }
  //     } else {
  //       result.err = "answer length is error";
  //       result.code = 102;
  //     }
  //   } else {
  //     result.err = 'versions do not recognized: ' + answer[0];
  //     result.code = 101;
  //     // logger.error(result.err);
  //   }
  //   // logger.info(result);
  //   callback(result.err, result);
  // },
  weixin: function(url, callback) {
    var result={};
    // var access_token = "GCqWyAzXvI4mc2b_knthqK8F7DodFGasfJ24DmHcT6LNSbIC82oog69bKsoVSlEAoDLmoX6pbecrjWvT66bOPx4E8tCA4y8SQkLjZ9tkPDH1I1zyxl3Uqakb8TE6cyzIUMHeAIANFA";
    // var  ticket = "kgt8ON7yVITDhtdwci0qeSNtWYXJSuvZJP3RnTIvPI7m2FFDJlScanEGqYByXPF1b_ju5C7PIhGDBpSsBePa9Q";
    // result.data = sign(ticket, url);
    // result.data.appId ='wx6861f713d7a41966';
    var sdk = new JSSDK(config.appId, config.appSecret, url);
    sdk.getSignPackage(function(err,data){
      result.data = data;
      callback(result.err, result);
    });
  }
}
module.exports = application;
