var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {

  // use the player model to find all player,
  // and use the include option to grab info from the User model.
  // This will let us show the player and it's owner.
  models.Player.findAll({
    include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(players) {
    // grab the user info from our req.
    // How is it in our req?
    // This info gets saved to req via the users_controller.js file.
    res.render('fantasy/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      players: players
    });
  });
});

router.get('/runningbacks', function(req, res) {
  res.render('fantasy/runningbacks');
});

router.get('/quarterbacks', function(req, res) {
  res.render('fantasy/quarterbacks');
});

router.get('/tightends', function(req, res) {
  res.render('fantasy/tightends');
});

router.get('/widereceivers', function(req, res) {
  res.render('fantasy/widereceivers');
});

router.put('/update/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Burger model to update a Burger's devoured status
  // based on the boolean passed in req.body devoured
  // and the id of the Burger (as passed in the url)
  models.Player.update(
  {
    devoured: req.body.devoured
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/');
  }, function(rejectedPromiseError){

  });
});

module.exports = router;
