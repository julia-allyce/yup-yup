// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var User       = require('../api/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase();

        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {content: 'No user found.'});

                if (!user.validPassword(password))
                    return done(null, false, {content: 'Oops! Wrong password.'});

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

   
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); 

        process.nextTick(function() {
            
            if (!req.user) {
                User.findOne({ 'email' :  email }, function(err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, {content: 'That email is already taken.', status: 400});
                    } else {

                        var newUser = new User({
                            name: req.body.name,
                            handle: req.body.handle,
                            email: email,
                            bio: req.body.bio,
                            isActive: true
                        });

                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            } else {
                return done(null, req.user);
            }

        });

    }));
};