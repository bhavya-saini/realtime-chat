// node server for socket io connection
const {Server} = require('socket.io');

const users = {};
require('dotenv').config()
const io = new Server(process.env.PORT,{});
console.log(process.env.PORT || 8000);

io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        // console.log("new user:",name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message, name: users[socket.id]});
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
    
});
