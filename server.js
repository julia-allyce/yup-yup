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

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.get('/login', function(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/signup', function(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage') });
});

app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

app.use('/app', require('./app/index'));
app.use('/api', require('./api/index'));
app.listen(port);
console.log('Magic happens on port ' + port);
