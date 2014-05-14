var User = require('../../models/user'),
	passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    User   = require('../../models/user'),
    session      = require('express-session');

require('../../../config/passport')(passport);

module.exports = function(req, res) {
	passport.authenticate('local-signup', function(err, user, msg) {
		if(err)
			res.status(500).json(err);
		if(user) {
			var result = new User(user);
			User.find(null, publicFields(), function(err, users) {
				if(err)
					res.status(500).send();
				var theUser = result.publicUser();
				theUser.friends = users;
				res.status(201).json(theUser);
			});
		} else {
			res.status(400).json(msg.content);
		}
	})(req, res);
	
};

function publicFields () {
    return [
        '_id',
        'name',
        'handle',
        'email',
        'bio',
        'isActive',
    ].join(' ');
};