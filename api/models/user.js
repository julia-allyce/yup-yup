var mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	bcrypt    = require('bcrypt-nodejs');

var UserSchema   = new Schema({
	name: { type: String, default: '' },
	handle: { type: String, default: '' },
	email: { type: String, default: '' },
	bio: { type: String, default: '' },
	isActive: { type: Boolean, default: false },
	password: { type: String, default: '' }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


UserSchema.methods.publicUser = function() {
    return {
    	_id: this._id,
    	name: this.name,
    	handle: this.handle,
    	email: this.email,
    	bio: this.bio,
    	isActive: this.isActive
    };
};

module.exports = mongoose.model('User', UserSchema);