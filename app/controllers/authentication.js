var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Movie = mongoose.model('Movie');

module.exports.register = function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.status(400).json({
      "message": "All fields required!"
    })
    return;
  }
  var user = new User();

  user.email = req.body.email;

  user.setPassword(req.body.password);
  user.movie_list = [];  
  user.save(function(err) {
    if (err) {
      res.status(404).json({message: "Email already in use"});
      console.log(err);
      return;
    }
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
    console.log("Saved user " + req.body.email);
  });
};

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      console.log("Logged in user");
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};