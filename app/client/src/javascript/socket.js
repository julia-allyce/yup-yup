var io = require('socket.io-client'),
	socket = module.exports = io.connect('/');
socket.on('connect', function (data) {
    socket.emit('room', App.User.id);
    socket.on('newConversation', function (data) {
    	App.Conversations.add(data);
    });
    socket.on('newChat', function (data) {
    	var convo = App.Conversations.get(data.conversation);
    	convo.get('messages').add(data);
    });
 });