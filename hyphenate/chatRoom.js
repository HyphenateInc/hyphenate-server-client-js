var client = require('./../client');
function ChatRoom() {

    //Create a chat room
    this.createChatRoom = function (json, callback) {
        var data = {
            name: json.name,
            description: json.description,
            maxusers: json.maxusers,
            owner: json.owner,
            members: json.members
        };
        client.client({
            data: data,
            path: 'chatrooms',
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Update chat room details
    this.modifyChatRoom = function (json, callback) {
        var data = {
            name: json.name,
            description: json.description,
            maxusers: json.maxusers
        };
        client.client({
            data: data,
            path: 'chatrooms/' + json.chatroom_id,
            method: 'PUT'
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Delete a chat room
    this.deleteChatRoom = function (chatroom_id, callback) {
        client.client({
            path: 'chatrooms/' + chatroom_id,
            method: 'DELETE'
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Get all chat rooms
    this.getChatRooms = function (callback) {
        client.client({
            path: 'chatrooms',
            method: 'GET'
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Get chat room detail
    this.getChatRoomDetail = function (chatroom_id, callback) {
        client.client({
            path: 'chatrooms/' + chatroom_id,
            method: 'GET'
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Get all chat room of user joined
    this.getChatRoomJoined = function (username, callback) {
        client.client({
            path: 'users/' + username + '/joined_chatrooms',
            method: 'GET'
        }, function(body){
            if (callback) callback(body);
        });
    };
    //Add a member to chat room
    this.addChatRoomMember = function (chatroomid, username, callback) {
        client.client({
            path: 'chatrooms/' + chatroomid + '/users/' + username,
            method: 'POST'
        }, function(body){
            if (callback) callback(body);
        });
    };
    //Add multiple members to chat room
    this.addChatRoomMembers = function (chatroomid, json, callback) {
        var data = {usernames: json};
        client.client({
            path: 'chatrooms/' + chatroomid + '/users/',
            method: 'POST',
            data: data
        }, function(body){
            if (callback) callback(body);
        });
    };

    //Remove a member from chat room
    this.deleteChatRoomMember = function (chatroomid, username, callback) {
        client.client({
            path: 'chatrooms/' + chatroomid + '/users/' + username,
            method: 'DELETE'
        }, function(body){
            if (callback) callback(body);
        });
    };
    //Remove multiple member from chat room
    this.deleteChatRoomMembers = function (chatroomid, usernames, callback) {
        client.client({
            path: 'chatrooms/' + chatroomid + '/users/' + usernames,
            method: 'DELETE'
        }, function(body){
            if (callback) callback(body);
        });
    };
}

module.exports = ChatRoom;