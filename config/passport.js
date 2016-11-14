// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../modules/user/server/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, {message: "That email is already taken."});
            }
            /* Back end validation: not recommanded
            if(req.body.password.length < 6){
                return done(null, false, {message: "The length of password must greater than 5."})
            }
            if(!(/[A-Z]/.test(req.body.password) && /[0-9]/.test(req.body.password))){
                return done(null, false, {message: "The password must at least contains 1 Captical letter and 1 number."})
            }
            if(req.body.password != req.body.confirmPassword){
                return done(null, false, {message: "The two password are not match."})
            }
            */
            else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.firstName    = req.body.firstName;
                newUser.local.lastName    = req.body.lastName;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, {message: "Username is not exist, please try again."}); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(req.body.password))
                return done(null, false, {message: 'Invalid password, please try again.'}); // create the loginMessage and save it to session as flashdata
            
            // if user is frozen by admin
            if (user.frozen === true)
                return done(null, false, {message: "This account has been frozen, please contact the customer service to unfreeze."});
            
            // all is well, return successful user
            return done(null, user);
        });

    }));

};