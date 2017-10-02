var mongoose = require('mongoose');

module.exports = movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  poster_url: {
    type: String,
    required: true
  },
  watched: Boolean
});

mongoose.model('Movie', movieSchema);

