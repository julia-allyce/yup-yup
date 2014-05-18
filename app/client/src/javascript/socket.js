var io = require('socket.io-client'),
	socket = module.exports = io.connect('http://localhost');
socket.on('connect', function (data) {
    socket.emit('room', App.User.id);
    socket.on('lsls', function (data) {
    	console.log(data);
    });
 });