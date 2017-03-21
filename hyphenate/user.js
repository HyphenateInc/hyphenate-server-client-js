var client = require('./../client');
function User() {

    // Create a user
    this.createUser = function (username, password, callback) {
        var data = {username: username, password: password};
        client.client({
            data: data,
            path: 'users',
            method: 'POST',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Create multiple users
    this.createUsers = function (users, callback) {
        client.client({
            data: users,
            path: 'users',
            method: 'POST',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get a user
    this.getUser = function (username, callback) {
        client.client({
            path: 'users/' + username,
            method: 'GET',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get users in batch
    this.getUsers = function (limit, cursor, callback) {
        client.client({
            path: 'users',
            method: 'GET',
            headers: {},
            query: {'limit': limit, 'cursor': cursor}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Delete a user
    this.deleteUser = function (username, callback) {
        client.client({
            path: 'users/' + username,
            method: 'DELETE',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Delete users in batch
    this.deleteUsers = function (limit, cursor, callback) {
        client.client({
            path: 'users',
            method: 'DELETE',
            headers: {},
            query: {'limit': limit, 'cursor': cursor}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Reset user's password
    this.resetPassword = function (username, oldpwd, newpwd, callback) {
        var data = {oldpassword: oldpwd, newpassword: newpwd};
        client.client({
            data: data,
            path: 'users/' + username + '/password',
            method: 'PUT',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    //Update user's nickname
    this.editNickname = function (username, nickname, callback) {
        var data = {nickname: nickname};
        client.client({
            data: data,
            path: 'users/' + username,
            method: 'PUT',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    //Add a friend for user
    this.addFriend = function (username, friendname, callback) {
        client.client({
            path: 'users/' + username + '/contacts/users/' + friendname,
            method: 'POST',
            headers: {}
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Delete a friend for user
    this.deleteFriend = function (username, friendname, callback) {
        client.client({
            path: 'users/' + username + '/contacts/users/' + friendname,
            method: 'DELETE'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get user's friends list
    this.showFriends = function (username, callback) {
        client.client({
            path: 'users/' + username + '/contacts/users',
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get user's blacklist
    this.getBlacklist = function (username, callback) {
        client.client({
            path: 'users/' + username + '/blocks/users',
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Block user(s)
    this.addUserForBlacklist = function (username, users, callback) {
        var data = {usernames: users};
        client.client({
            data: data,
            path: 'users/' + username + '/blocks/users',
            method: 'POST'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // UnBlock user(s)
    this.deleteUserFromBlacklist = function (username, blackuser, callback) {
        client.client({
            path: 'users/' + username + '/blocks/users/' + blackuser,
            method: 'DELETE'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    //Get user online status
    this.isOnline = function (username, callback) {
        client.client({
            path: 'users/' + username + '/status',
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get offline message count
    this.getOfflineMessages = function (username, callback) {
        client.client({
            path: 'users/' + username + '/offline_msg_count',
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Get offline message status
    this.getOfflineMessageStatus = function (username, msgid, callback) {
        client.client({
            path: 'users/' + username + '/offline_msg_status/' + msgid,
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Deactivate user account
    this.deactivateUser = function (username, callback) {
        client.client({
            path: 'users/' + username + '/deactivate',
            method: 'POST'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Activation user account
    this.activateUser = function (username, callback) {
        client.client({
            path: 'users/' + username + '/activate',
            method: 'POST'
        }, function (body) {
            if (callback) callback(body);
        });
    };

    // Logout user
    this.disconnectUser = function (username, callback) {
        client.client({
            path: 'users/' + username + '/disconnect',
            method: 'GET'
        }, function (body) {
            if (callback) callback(body);
        });
    };
}
module.exports = User;