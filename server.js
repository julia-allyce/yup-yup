var express    = require('express'),
	app        = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/mongodb.js');

var	passport 	 = require('passport'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ourlittlesecret', cookie: { maxAge: 20000 }}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));


app.get('/', function(req, res) {
	res.redirect('/app');
});
app.use('/app', require('./app/index'));
app.use('/api', require('./api/index')(passport));
app.listen(port);
console.log('Magic happens on port ' + port);
