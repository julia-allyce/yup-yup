var express      = require('express'),
    User         = require('../../models/user'),
    Conversation = require('../../models/conversation'),
    router       = express.Router();
module.exports = function (passport) {

	router.route('/')
		.post(passport.authenticate('local-login'), function(req, res) {
			var result = new User(req.user).publicUser();
			User.find(null, publicFields(), function(err, users) {
				if(err)
					res.status(500).send();
				result.friends = users;
				res.status(200).json(result);
			});
		})
		.get(function(req, res) {
			if(req.isAuthenticated()) {
		    	res.status(200).json(req.user);
			}
		    	
		    res.status(401).json();
		});

	return router;
}

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
