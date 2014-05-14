var express    = require('express'),
	app = module.exports = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session');

require('../../../config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());


// process the login form
app.get('/', function(req, res) {
		req.logout();
		res.status('204');
});