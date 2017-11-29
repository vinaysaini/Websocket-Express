exports.connectSocket = function (server) {
    if (!server.app) {
        server.app = {}
    }
    server.app.socketConnections = {};
    var socket = require('socket.io').listen(server);
    socket.on('disconnect', function(){
        console.log('socket disconnected')
    });

    socket.on('connection', function(socket){
        socket.emit('messageFromServer', { message:'WELCOME TO EXAMPLE PROJECT', performAction:'INFO'});
        socket.on('messageFromClient', function (data) {
            //Update SocketConnections
            data =  JSON.parse(data);
            if (data && data.userId) {
                if (server.app.socketConnections.hasOwnProperty(data.userId)) {
                    server.app.socketConnections[data.userId].socketId = socket.id;
                    socket.emit('messageFromServer', { message:'Socket id Updated',performAction:'INFO'});
                } else {
                    server.app.socketConnections[data.userId] = {
                        socketId: socket.id
                    };
                    socket.emit('messageFromServer', { message:'Added To socketConnections',performAction:'INFO'});
                }
            }else {
                console.log('message from client: ',data)
            }
        });
    });

    process.on('sendNotification', function (data) {
        var sparkIdToSend = server.app.socketConnections[data['userId'].toString()]
            && server.app.socketConnections[data['userId']].socketId;
        if (sparkIdToSend) {
            console.log("============socket emit=======sparkIdToSend=======",sparkIdToSend);
            console.log("============socket emit=======data=======",data);
            socket.to(sparkIdToSend).emit('messageFromServer', {
                message: 'NEW_NOTIFICATION',
                performAction : 'UPDATE',
                data: data
            });
        } else {
            console.log('Socket id not found')
        }
    });
};
