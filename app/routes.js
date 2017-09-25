var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwt_config = require('./models/jwt_config')
var auth = jwt({
  secret: jwt_config.jwt_secret,
  userProperty: 'payload'
});

var ctrlProfile = require('./controllers/profile');
var ctrlAuth = require('./controllers/authentication');

// profile
router.get('/user', auth, ctrlProfile.profileRead);
router.post('/add', auth, ctrlProfile.addMovie);
router.post('/delete', auth, ctrlProfile.deleteMovie);
router.get('/')
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;