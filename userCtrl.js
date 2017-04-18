var users = require('./users');

module.exports = {
    readAll: function() {
        var allUsers = users.find();
        return allUsers; // Or null if it is required.
    },

    findUserById: function(userId) {
        var singleUser = users.findOne("id", userId);
        return singleUser;
    },

    getAdmins: function() {
        var allAdmins = users.find("type", "admin");
        return allAdmins;
    },

    getNonAdmins: function() {
        var allNonAdmins = users.find("type", "user");
        return allNonAdmins;
    },

    getUsersByFavorite: function(favorite) {
        var allUsers = users.find();
        var favoriteUsers = [];
        for (var i = 0; i < allUsers.length; i++) {
            for (var j = 0; j < allUsers[i].favorites.length; j++) {
                if (allUsers[i].favorites[j] === favorite) {
                    favoriteUsers.push(allUsers[i]);
                }
            }
        }
        return favoriteUsers;
    },

    getUsersByAgeLimit: function(age) {
        var allUsers = users.find();
        var ageAppropriateUsers = [];
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].age < age) {
                ageAppropriateUsers.push(allUsers[i]);
            }
        }
        return ageAppropriateUsers;
    },

    findUserByQuery: function(queryTerm, value) {
        var queriedUsers = users.find(queryTerm, value);
        return queriedUsers;
    },

    createUser: function(userObj) {
        var newUser = users.add(userObj);
        return newUser;
    },

    updateUser: function(userId, obj) {
        var updatedUser = users.update("id", userId, obj);
        return updatedUser;
    },

    removeUser: function(userId) {
        var deletedUser = users.remove("id", userId);
        return deletedUser;
    }


}