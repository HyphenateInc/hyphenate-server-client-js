var client = require('./../client');
function ChatHistory() {
    // Get chat history
    this.getChatMessages = function (ql, limit, cursor, callback) {
        client.client({
            path: 'chatmessages',
            method: 'GET',
            query: {'ql': ql, 'limit': limit, 'cursor': cursor},
            headers: {}
        }, function(body){
            if (callback) callback(body);
        });
    };
}
module.exports = ChatHistory;
