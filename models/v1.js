var v1 = {
  scoreAbility: function(scores) {
    var result = 0;
    result = scores[3] + scores[10] + scores[11] + scores[12] + scores[13];
    console.log("scoreAbility-" + result);

    if (result >= 5 && result <= 7) {
      result = 1;
    } else if (result > 7 && result < 12) {
      result = 2;
    } else if (result >= 12 && result <= 16) {
      result = 3;
    } else if (result > 16 && result < 20) {
      result = 4;
    } else if (result >= 20 && result <= 23) {
      result = 5;
    }
    return result;
  },
  scoreSubject: function(scores) {
    var result = 0;
    result = 2 * scores[1] + 0.5 * scores[7] + scores[2] + scores[5] + scores[6];
    console.log("scoreSubject-" + result);

    if (result >= 5.5 && result <= 13) {
      result = 1;
    } else if (result > 13 && result <= 16) {
      result = 2;
    } else if (result > 16 && result <= 20) {
      result = 3;
    } else if (result > 20 && result <= 23) {
      result = 4;
    } else if (result > 23 && result <= 30) {
      result = 5;
    }
    return result;
  },
  scoreObject: function(scores) {
    var result = 0;
    result = 0.5 * scores[8] + 0.5 * scores[9];
    console.log("scoreObject-" + result);
    if (result >= 0 && result < 0.1) {
      result = 1;
    } else if (result >= 0.1 && result < 0.3) {
      result = 2;
    } else if (result >= 0.3 && result <= 0.7) {
      result = 3;
    } else if (result >= 0.7 && result < 0.9) {
      result = 4;
    } else if (result >= 0.9 && result < 1) {
      result = 5;
    }
    return result;
  },
  willingLevel: function(subject, object) {
    var result = 0;
    var temp;
    if (subject - object <= 1 && subject - object >= -1) {
      result = subject;
    } else {
      temp = (subject + object) / 2;
      if (subject > object) {
        result = Math.floor(temp);
      } else {
        result = Math.ceil(temp);
      }
    }
    return result;
  },
  percentCompute: function(ability, willing, level, map) {
    var result = 0;
    var percent = map.percentMap[ability] * map.percentMap[willing];
    var total = map.percentTotalMap[level];
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
  }
}
module.exports = v1;
