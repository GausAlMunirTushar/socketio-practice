const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("myevent", (data) => {
		console.log(data);
	});
});

// Home route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// Server setup
server.listen(4000, () => {
	console.log(`Server Running at http://localhost:4000`);
});
