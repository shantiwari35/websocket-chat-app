//Node server which will handle socket io connection

const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    });

    socket.on('disconnect', message => {
        // console.log(users[socket.id]);
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });



})
// io.on('disconnect', socket => {
 
// });
