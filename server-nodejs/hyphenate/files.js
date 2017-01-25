var fs = require('fs');
var FormData = require('form-data');
var client = require('./../client');

function Files() {

    // Upload file
    // Warning: File cannot be over 10MB, otherwise will fail.
    this.uploadFile = function (json, callback) {
        var form = new FormData();
        form.append('file', fs.createReadStream(json.filePath));
        client.client({
            path: 'chatfiles',
            method: 'POST',
            form: form,
            headers: {'restrict-access': json.restrictAccess}
        }, function (body) {
            if (callback) callback(body);
        }, client.uploadFileWithToken);
    };

    // Download file
    this.downloadFile = function downloadFile(json, callback) {
        json = json || {};
        client.client({
            path: 'chatfiles/' + json.uuid,
            method: 'GET',
            headers: {'accept': ' application/octet-stream', 'share-secret': json.shareSecret}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Download thumbnail
    this.downloadThumbnail = function downloadThumbnail(json) {
        json = json || {};
        client.client({
            path: 'chatfiles/' + json.uuid,
            method: 'GET',
            headers: {
                'accept': ' application/octet-stream',
                'share-secret': json.shareSecret,
                'thumbnail': json.thumbnail
            }
        }, function (body) {
            if (callback) callback(body);
        });
    };
}
module.exports = Files;



