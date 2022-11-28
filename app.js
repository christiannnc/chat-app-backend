const express = require("express");
const app = express();

const port = 3001;

const io = require("socket.io")(3002, {
    cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
    console.log(`new user: ${socket.id}`);
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`user joined room ${room}`);
    });

    socket.on("send-message", (message, room, senderId) => {
        console.log(`message: ${message} room: ${room} id: ${senderId}`);
        socket.to(room).emit("incoming-message", {
            message,
            senderId,
        });
    });

    socket.on("ping", (room) => {
        console.log("ping! to room " + room);
        io.to(room).emit("pong", "pong!");
    });
});

app.listen(port);
console.log(`Listening on port ${port} 🚀`);
