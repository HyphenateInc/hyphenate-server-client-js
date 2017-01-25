var client = require('./../client');
const util = require('util');

function Message() {

    // Send text message
    this.sendText = function (json, callback) {
        var json = json || {};
        var body = {
            target_type: json.target_type,
            target: json.target,
            msg: {
                type: 'txt',
                msg: json.content
            },
            from: json.from
        };
        json.ext && (body.ext = json.ext);

        console.log('sendText: ' + util.inspect(body, false, null));

        client.client({
            body: body,
            path: 'messages',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    }

    // Send image message
    this.sendImage = function (json, callback) {
        var json = json || {};
        var body = {
            target_type: json.type,
            target: json.target,
            msg: {
                type: 'img',
                url: json.url,
                filename: json.filename,
                secret: json.secret,
                size: {width: 480, height: 720}
            },
            from: json.from
        };
        json.ext && (body.ext = json.ext);

        client.client({
            body: body,
            path: 'messages',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };

    // Send audio message
    this.sendAudio = function (json, callback) {
        var json = json || {};
        var body = {
            target_type: json.type,
            target: json.target,
            msg: {type: 'audio', url: json.url, filename: json.filename, length: json.length, secret: json.secret},
            from: json.from
        };
        json.ext && (body.ext = json.ext);

        client.client({
            body: body,
            path: 'messages',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };

    // Send video message
    this.sendVideo = function (json, callback) {
        var json = json || {};
        var body = {
            target_type: json.type,
            target: json.target,
            msg: {
                type: 'video',
                url: json.url,
                filename: json.filename,
                thumb: json.thumb,
                length: json.length,
                file_length: json.file_length,
                thumb_secret: json.thumb_secret,
                secret: json.secret
            },
            from: json.from
        };
        json.ext && (body.ext = json.ext);

        client.client({
            body: body,
            path: 'messages',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };

    // Send commend message
    this.sendCmd = function (json, callback) {
        var json = json || {};
        var body = {
            target_type: json.type,
            target: json.target,
            msg: {type: 'cmd', action: json.action},
            from: json.from
        };
        json.ext && (body.ext = json.ext);

        client.client({
            body: body,
            path: 'messages',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };
}

module.exports = Message;
