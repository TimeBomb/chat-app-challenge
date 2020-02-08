const express = require('express');
const http = require('http');
const io = require('socket.io');

const Events = require('../shared/events');

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

app.use(express.static('dist'));

socketServer.on('connection', socket => {
	console.log('user connected');
	socket.on(Events.chatMessage, payload => {
		// Emit to all sockets except the sender, as the app will
		// display their message instantly upon it being sent
		socket.broadcast.emit(Events.chatMessage, payload);
	});
});

server.listen(process.env.PORT || 8080, () =>
	console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
