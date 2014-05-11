var mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	bcrypt    = require('bcrypt-nodejs');

var UserSchema   = new Schema({
	name: String,
	handle: String,
	email: String,
	bio: String,
	isActive: Boolean,
	password: String
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);