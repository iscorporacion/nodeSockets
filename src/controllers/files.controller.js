const { getSocket, getServer } = require("../sockets");
const { timeago } = require("../libs/globalFunctions");
const moment = require("moment");

const filesController = async (req, res) => {
    // Find all saved messages
    res.render("sections/files");
};

// const allsave = async (req, res) => {
// 	const {username,socketId, message} = req.body;
// 	let date = moment();
// 	let ahora = timeago(date);
// 	getServer().of("/admin").emit("server",{message,username,socketId,date,ahora});
// 	// getSocket().broadcast.emit('in', 'hello friends!');
// 	// console.log("Yo soy ",req.cookies.io)
// 	getServer().of("/admin").to("/admin#"+req.cookies.io).emit('in', 'Enviaste un mensaje');
// 	res.status(200).json({name:req.body.username});
// 	// console.log(req)
// };

module.exports = {
    filesController
};