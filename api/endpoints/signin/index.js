var express    = require('express'),
	app = module.exports = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    User   = require('../../models/user'),
    session      = require('express-session');

require('../../../config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());


// process the login form
app.post('/', passport.authenticate('local-login'), function(req, res) {
	var result = new User(req.user).publicUser();
    res.send(result);
});