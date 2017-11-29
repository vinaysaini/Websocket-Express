var sendNotification = function(req,res) {
	console.log("Request data========",req.body);
	process.emit('sendNotification',req.body);
	return res.send();
}

module.exports = sendNotification;