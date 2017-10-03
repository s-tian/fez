var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
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
    new_movie.title = req.body.movie_data.title;
    new_movie.poster_url = req.body.movie_data.poster_path;
    new_movie.watched = false;
    User.findByIdAndUpdate( 
      req.payload._id,
      { 
        $push: {
          movie_list: {
            $each: [new_movie],
            $position: 0
          }
        },
      },
      function(err, model) {
        res.status(200).json({"success": !err});
      }
    );
    console.log("Adding movie for user..." + new_movie.title);
  }
}

module.exports.deleteMovie = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
    .findByIdAndUpdate(req.payload._id, {
        $pull: {movie_list: {
            _id: req.body.id   //_eventId is string representation of event ID
        }}
    }, function(err, module) {
        res.status(200).json({"success": !err});
    });
    console.log("Deleting movie...");
  }
}


module.exports.setWatchedMovie = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
    .update({_id: req.payload._id, 'movie_list._id': req.body.id},
    {'$set': {
        'movie_list.$.watched': true
    }},
    function(err, module) {
        res.status(200).json({"success": !err});
    });
    console.log("Setting movie as watched...");
  }
}



