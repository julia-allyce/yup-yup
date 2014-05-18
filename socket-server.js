var socket       = require('socket.io'),
	room;

module.exports = function(server) {
	io = socket.listen(server);
	io.sockets.on('connection', function (socket) {
		console.log('BLAFJAFASKLFH:ASKD');
	    socket.on('room', function (data) {
	  		room = data;
		    socket.join(data);
		    socket.broadcast.to(room).emit('chat','hello');
		});
	 });
	return io;
};