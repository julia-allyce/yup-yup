var User   = require('../../models/user'),
	getAll = module.exports = function(req, res) {
		User.find(null, publicFields(), function(err, users) {
			if (err)
				res.status(500).send(err);

			res.status(200).json(users);
		});
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