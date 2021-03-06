var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwt_config = require('./models/jwt_config')
var auth = jwt({
  secret: jwt_config.jwt_secret,
  userProperty: 'payload'
});

// These are all /api/ paths, redirected from server.js

var ctrlProfile = require('./controllers/profile');
var ctrlAuth = require('./controllers/authentication');
var ctrlMovie = require('./controllers/movie_data')
// profile
router.get('/user', auth, ctrlProfile.profileRead);
router.post('/add', auth, ctrlProfile.addMovie);
router.post('/delete', auth, ctrlProfile.deleteMovie);
router.post('/watched', auth, ctrlProfile.setWatchedMovie);
router.post('/preview', ctrlMovie.getSearchData);
router.get('/popular', ctrlMovie.getPopularList);
router.get('/')
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;