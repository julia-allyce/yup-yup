var express      = require('express'),
	app          = express(),
    port         = process.env.PORT || 8080,
	http		 = require('http'),
    mongoose     = require('mongoose'),
    morgan       = require('morgan'),
    passport     = require('passport'),
    flash        = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),

    configDB = require('./config/mongodb.js'),

   	passport 	 = require('passport'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session');

var server       = http.createServer(app).listen(port);

var io = require('./socket-server.js')(server);

mongoose.connect(configDB.url);

require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ourlittlesecret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));


app.get('/', function(req, res) {
	res.redirect('/app');
});
app.use('/app', require('./app/index'));
app.use('/api', require('./api/index')(passport));
