var api_config = require('./../models/movie_db_config');
var request = require('request');

module.exports.getSearchData = function(req, res) {
  var query = req.body.query;
  if(query == "") {
    res.status(200).json({});
    return;
  }
  // Query API
  var url = "https://api.themoviedb.org/3/search/movie?api_key=" + api_config.api_key + "&query=" + query;
	//console.log(url);
  request(url, function (error, response, body) {
  	//console.log('error:', error); // Print the error if one occurred
  	//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var body_json = JSON.parse(body);
    //console.log(body_json.results[0]);
    if(!error && body_json.results != null) {
      res.status(200).json(body_json.results[0]) // Get first result as preview
    } else {
      res.status(404).json(error);
    }
  });
}

module.exports.getPopularList = function(req, res) {
  // Query API
  var popular_movie_titles = [];
  var get_movie_page = function(index) {
    var url = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_config.api_key + "&language=en-US&page=" + index.toString();
    request(url, function (error, response, body) {
      //console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var body_json = JSON.parse(body);
      //console.log(body_json.results[0]);
      if(!error && body_json.results != null) {
        body_json.results.forEach(function(obj) {
          if(obj.title.length < 15) {   //Don't get movie titles that are too long to display.
            popular_movie_titles.push(obj.title);
          }
        });
        if(popular_movie_titles.length > 15) {
          res.status(200).json(JSON.stringify(popular_movie_titles)); // Get first page of popular movies to display
        } else {
          get_movie_page(index+1);
        }
      } else {
        res.status(404).json(error);
      }
    });
  };
  get_movie_page(1);
}

module.exports.getRuntime = function(movie_id, callback) {
  var url = "https://api.themoviedb.org/3/movie/" + movie_id.toString() + "?api_key=" + api_config.api_key + "&language=en-US";
  request(url, function(error, response, body) {
    var body_json = JSON.parse(body);
    if(!error & body_json.runtime != null) {
      if(typeof callback === "function") {
        // Make sure the function that called getRuntime
        // has its callback function executed after the
        // API call
        
        callback(body_json.runtime);
      }
    } else {
      console.log(error);
    }
  })
}