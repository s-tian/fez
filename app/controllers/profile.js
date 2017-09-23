var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var Movie = mongoose.model('Movie');

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
    console.log("Getting information for user..");
  }

};

module.exports.addMovie = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    var new_movie = new Movie();
    new_movie.title = req.body.title;
    User.findByIdAndUpdate(
      req.payload._id,
      {$push: {"movie_list": new_movie}},
      {safe: true, upsert: false, new: true},
      function(err, model) {
        console.log(err);
        res.status(200).json({"success": !err});
      }
    );
    console.log("Updating info for user...");
  }
}
