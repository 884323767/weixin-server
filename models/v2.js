var scoreMap = require('./scoremap');
var levelMap = scoreMap.v2.levelMap;

var v2 = {
  scoreSubject: function(scores) {
    var result = 0;
    result = scores[7] + scores[8] + scores[9] + scores[10];
    console.log("scoreSubject-" + result);
    if (result >= 4 && result <= 6) {
      result = 1;
    } else if (result >= 7 && result <= 9) {
      result = 2;
    } else if (result >= 10 && result <= 13) {
      result = 3;
    } else if (result >= 14 && result <= 17) {
      result = 4;
    } else if (result >= 18 && result <= 20) {
      result = 5;
    }
    return result;
  },
  scoreObject: function(scores) {
    var result = 0;
    result = scores[3] + scores[4] + scores[5] + scores[6];
    console.log("scoreObject-" + result);
    if (result >= 4 && result <= 6) {
      result = 1;
    } else if (result >= 7 && result <= 9) {
      result = 2;
    } else if (result >= 10 && result <= 13) {
      result = 3;
    } else if (result >= 14 && result <= 17) {
      result = 4;
    } else if (result >= 18 && result <= 20) {
      result = 5;
    }
    return result;
  },
  finallyLevel: function(answer, level) {
    if (answer[5] == 0 || answer[6] == 0 && level > 3) {
      level = 3
    }
    if (answer[5] == 0 && answer[6] == 0 && level > 2) {
      level = 2;
    }
    if (answer[7] == 0 && level > 2) {
      level = 2;
    }
    return level;
  },
  percentCompute: function(object, subject, level) {
    var result = 0;
    var percent = levelMap[object * 10 + subject][1];
    var total = this.percentTotalMap();
    total = total[parseInt(level)];
    result = percent / total;
    result = parseFloat(result.toFixed(3));
    return result;
  },
  scoreCompute: function(index, score, result) {
    if (typeof score == 'undefined') {
      result.code = 100;
      result.err = 'scoreMap err: in the question ' + index;
      // logger.error(result.err);
    } else {
      result.scores[index] = score;
    }
  },
  percentTotalMap: function() {
    var result = [0, 0, 0, 0, 0, 0];
    for (var index in levelMap) {
      switch (parseInt(levelMap[index][0])) {
        case 1:
          result[1] += levelMap[index][1];
          break;
        case 2:
          result[2] += levelMap[index][1];
          break;
        case 3:
          result[3] += levelMap[index][1];
          break;
        case 4:
          result[4] += levelMap[index][1];
          break;
        case 5:
          result[5] += levelMap[index][1];
          break;
        default:
          console.error('percentTotalMap Error');
          break;
      }
    }
    console.log(result);
    return result;
  }
}
module.exports = v2;
