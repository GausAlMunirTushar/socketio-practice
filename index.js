const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// Home route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("chat", (message) => {
		io.emit("chat_message", message);
	});
	socket.join("kitchen_room");
	const sizeOfRoom = io.sockets.adapter.rooms.get("kitchen_room").size;
	io.sockets
		.in("kitchen_room")
		.emit("cooking", "cooking something on kitchen" + sizeOfRoom);
});
// Server setup
server.listen(4000, () => {
	console.log(`Server Running at http://localhost:4000`);
});
