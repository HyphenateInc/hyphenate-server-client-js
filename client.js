var Token = require('./hyphenate/token');
var config = require('./resources/config');
var request = require('request');
var fs = require('fs');
var util = require('util');

var ORG_NAME = config.ORG_NAME;
var APP_NAME = config.APP_NAME;
const HyphenateFullURL =  'https://' + config.host + '/' + ORG_NAME + '/' + APP_NAME;

var Initialized = false;
var token = new Token();

function client(json, callback) {
    if (!Initialized || token.isExpire()) {

        token.accessToken(function () {
            Initialized = true;

            sendRequestWithToken(json, function(error, response, body){
                var groupData = JSON.parse(body);
                if (callback) callback(groupData);
            });
        });
    }
    else {
        sendRequestWithToken(json, function(error, response, body){
            var groupData = JSON.parse(body);
            if (callback) callback(groupData);
        });
    }
}

function uploadFileWithToken(json) {
    if (token == null) {
        console.log('error: failed to access token!')
    } else {
        json.headers = json.headers || {};
        json.headers['http'] = 'multipart/form-data';
        json.headers['Authorization'] = 'Bearer ' + token.getToken();
        request.uploadFile(json);
    }
}

function sendRequestWithToken(options, callback) {

    if (token == null) {
        console.log('error: failed to access token!');
    } else {
        options.headers = options.headers || {};
        options.headers['Authorization'] = 'Bearer ' + token.getToken();
        sendRequest(options, function(error, response, body) {
            if (!error && callback) {
                callback(error, response, body);
                // console.log('callback - sendRequestWithToken. body: ' + body);
            }
        });
    }
}

function sendRequest(options, callback) {

    var fullOptions = options;

    fullOptions.url = HyphenateFullURL + '/' + options.path;
    fullOptions.method = options.method;

    fullOptions.headers = options.headers;
    fullOptions.headers['Content-Type'] = 'application/json';
    fullOptions.headers['Accept'] = 'application/json';

    fullOptions.body = JSON.stringify(options.body);

    if (options.data) {
        fullOptions.data = JSON.stringify(options.data);
    }

    // options.query = {};
    // //connect with query parameters
    // if (json.query != null) {
    //     options.path += '?';
    //     for (var key in json.query) {
    //         if (json.query[key] != null) {
    //             options.path += key + '=' + json.query[key] + '&';
    //         }
    //     }
    //     options.path = options.path.substring(0, options.path.length - 1);
    // }

    // var ca = fs.readFileSync(config.ca, 'utf-8');
    // fullOptions.ca = [ca];
    //
    // fullOptions.agent = false;

    // console.log('Debugger: sendRequest. options: ' + util.inspect(fullOptions, false, null));

    request(fullOptions, function (error, response, body) {

        // console.log('Debugger: sendRequest. response body: ' + util.inspect(body, false, null));
        // console.log('Debugger: sendRequest. statusCode: ' + util.inspect(response.statusCode, false, null));

        if (callback) {
            callback(error, response, body);
            // console.log('callback - sendRequest. body: ' + body);
        }
    });
}

module.exports = {
    client: client,
    uploadFileWithToken: uploadFileWithToken,
    sendRequest: sendRequest,
    sendRequestWithToken: sendRequestWithToken
};