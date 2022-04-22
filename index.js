const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT=process.env.PORT || 3000
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', {input:msg.input, name:msg.name});
    });

});

server.listen(PORT,()=>{
    console.log("conectao")
})

