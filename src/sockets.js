const socketIO = require("socket.io");
const { timeago } = require("./libs/globalFunctions");
const moment = require("moment");
let socket;
let realtime;

const connection = (server) => {
	// Adding socket connection to the server
	const io = socketIO.listen(server);
	realtime = io;
	// Handle events
	io.of('/admin').on("connection", (newSocket) => {
		socket = newSocket;
		io.of('/admin').clients((error, clients) => {
			if (error) throw error;
			// console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
		});
		newSocket.on('meId', (id, fn) => {
			fn(id);
		});
		newSocket.on('myDate', (date, fn) => {
			fn(timeago(date));
		});
		// io.on('meId', (socket) => {
		// 	console.log(socket);
		// 	socket.broadcast.emit("yourId", "Se actualizo la lista");
		// 	// io.of('/admin').emit("yourId", "hola viejo");
		// });
		
	});



};

const getSocket = () => socket;
const getServer = () => realtime;

module.exports = {
	connection,
	getSocket,
	getServer
};