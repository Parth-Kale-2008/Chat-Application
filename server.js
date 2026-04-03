const express = require("express");
const http = require("http");
const{Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
//const PORT = 3000;

app.use(express.static("public"));

io.on("connection",(socket)=>{
    console.log("user connected",socket.id);

    socket.on("New Text",(msg)=>{
    console.log("New Text",msg);
    io.emit("New Text", msg);
});

socket.on("typing",()=>{
    socket.broadcast.emit("typing");
});

socket.on("offline",()=>{
    socket.broadcast.emit("offline");
});

socket.on("disconnect",()=>{
    console.log("disconnected",socket.id);
});

});

server.listen(3000,()=>{
    console.log("server running on port 3000 ");
});


