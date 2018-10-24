

var auth = require('./auth');
var AccMd = require('../models/accModel').accouts;
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
var GoogleStrategy = require('passport-google-oauth2').Strategy;
module.exports = (passport) => {
    passport.serializeUser(function (acc, done) {
        done(null, acc.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        AccMd.findById(id, function (err, acc) {
            done(err, acc);
        });
    });
    passport.use(new GoogleStrategy({
        clientID:     auth.googleClientID,
        clientSecret: auth.googleClientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback"
        
      },
      function(request, accessToken, refreshToken, profile, done) {
                   if(profile.id) {
                            AccMd.findOne({userID:profile.id}).then((exit)=>{
                                if(exit) {
                                  done(null,exit)
                                   
                                }else{
                                    var adminHieu ;
                                    if(profile.id = 113713183499667010000){
                                        adminHieu =='admin'
                                    }
                                    var info = {
                                            role :adminHieu,
                                            userID : profile.id,
                                            email: profile.email,
                                            displayName: profile.displayName,
                                            image : profile.photos[0].value
                                            
                                    }
                                    var dulieu = AccMd(info)
                                    .save()
                                    .then((acc) => {
                                       done(null,acc);
                                        
                                    })
                                    
                                }
                            })
                    

                   
                   }
       
      }
    ));

}