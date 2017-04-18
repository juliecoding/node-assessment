var express = require('express');
var bodyParser = require('body-parser');
var user = require('./users.js')
var userCtrl = require('./userCtrl.js');

var app = express();

app.use(bodyParser.json());
//app.use(express.static(__dirname + '/app'));

app.get('/api/users', function(req, res, next) {
    if (req.query.favorites) {
        var favoriteUsers = userCtrl.getUsersByFavorite();
        res.status(200).send(favoriteUsers);
    } else if (req.query.age) {
        var usersOfAge = userCtrl.getUsersByAgeLimit(req.query.age);
        res.status(200).send(usersOfAge);
    } else {
        var allUsers = userCtrl.readAll();
        res.status(200).send(allUsers);
    }
});

app.get('/api/users/:userId', function(req, res, next) {
    var userOfInterest = userCtrl.findUserById(req.params.userId);
    res.status(200).send(userOfInterest);
})

app.get('/api/admins', function(req, res, next) {
    var admins = userCtrl.getAdmins();
    res.status(200).send(admins);
})

app.get('/api/nonadmins', function(req, res, next) {
    var nonadmins = userCtrl.getNonAdmins();
    res.status(200).send(nonadmins);
})

app.put('/api/users/:userId', function(req, res, next) {
    var updateDatUser = userCtrl.updateUser(req.params.userId, req.body);
    res.status(200).send(updateDatUser);
})

app.post('/api/users', function(req, res, next) {
    var newUser = userCtrl.createUser(req.body);
    res.status(200).send(newUser);
})

app.delete('/api/users/:userId', function(req, res, next) {
    var buleeted = userCtrl.removeUser(req.params.userId);
    res.status(200).send(buleeted);
})


var port = 3500;
app.listen(port, function() {
    console.log("Listening on", port);
})

module.exports = app;