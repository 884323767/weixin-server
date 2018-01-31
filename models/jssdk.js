var sign = require("./sign");
var fs = require("fs");
var err = null;
function get_file(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
}

function set_file(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf-8');
}

function httpGet(url, callback) {
  var ret;
  var errmsg = null;
  var option = {
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  };
  console.log('option=' + JSON.stringify(option));
  request(option, function(error, response, data) {
    if (error) {
      errmsg = JSON.stringify(error);
    } else if (data.errcode) {
      errmsg = JSON.stringify(data);
    } else {
      console.log("响应：" + data);
      ret = JSON.parse(data);
    }
    callback(errmsg, ret);
  })
}

var JSSDK = function(appId, appSecret, url) {
  this.appId = appId;
  this.appSecret = appSecret;
  this.url = url;
}

JSSDK.prototype.getSignPackage = function(callback) {
  _this = this;
  this.getJsApiTicket(function(err, jsapiTicket) {
    var result = sign(jsapiTicket, _this.url);
    result.appId = _this.appId;
    callback(err, result);
  });
};

JSSDK.prototype.getJsApiTicket = function(callback) {
  var data = get_file("./models/jsapi_ticket.js");
  var ticket;
  if (data.expire_time < +new Date()) {
    var accessToken = this.getAccessToken(function(err, accessToken) {
      // 如果是企业号用以下 URL 获取 ticket
      // var url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}";
      var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=" + accessToken;
      httpGet(url, function(err, data) {
        if (err) {
          callback(err, data);
          return;
        } else {
          ticket = data.ticket;
          if (ticket) {
            data.expire_time = +new Date() + 7000 * 1000;
            data.jsapi_ticket = ticket;
            set_file("./models/jsapi_ticket.js", data);
          }
          callback(err, ticket);
        }
      });
    })
  } else {
    ticket = data.jsapi_ticket;
    callback(err, ticket);
  }
};

JSSDK.prototype.getAccessToken = function(callback) {
  // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
  var data = get_file("./models/access_token.js");
  var access_token;
  if (data.expire_time < +new Date()) {
    // 如果是企业号用以下URL获取access_token
    // var url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this.appId}&corpsecret=${this.appSecret}";
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appId + "&secret=" + this.appSecret;
    httpGet(url, function(err, data) {
      if (err) {
        callback(err, data);
        return;
      } else {
        access_token = data.access_token;
        if (access_token) {
          data.expire_time = +new Date() + 7000 * 1000;
          data.access_token = access_token;
          set_file("./models/access_token.js", data);
        }
        callback(err, access_token);
      }
    })
  } else {
    access_token = data.access_token;
    callback(err, access_token);

  }
}
module.exports = JSSDK;
