var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors')
var SocketManager = require("./socketManager");
var sendNotification = require("./sendNotification");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", function(req, res) {
    res.send("Example Project for Websockets & Express");
});
app.post("/sendNotification", sendNotification);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

//Connect To Socket.io
SocketManager.connectSocket(server);