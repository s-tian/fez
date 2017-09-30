var api_config = require('./../models/movie_db_config');
var request = require('request');

module.exports.getSearchData = function(req, res) {
	var query = req.body.query;
  console.log(api_config.api_key);
  console.log(query);
	var url = "https://api.themoviedb.org/3/search/movie?api_key=" + api_config.api_key + "&query=" + query;
	console.log(url);
  request(url, function (error, response, body) {
  		//console.log('error:', error); // Print the error if one occurred
  		//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  		var body_json = JSON.parse(body);
      //console.log(body_json.results[0]);
  		if(!error) {
  			res.status(200).json(body_json)
  		} else {
  			res.status(404).json(error);
  		}
	});

}