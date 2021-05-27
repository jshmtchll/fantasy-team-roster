const router = require('express').Router();
const { Team, TeamMember } = require('../models/')
const sequelize = require('../config/connection');
const { index } = require('./api');



router.get('/', (req, res) => {
 res.render('homepage');
});



router.get('/teams', (req, res) => {
  Team.findAll({})
  .then(results => {
    const teams = results.map(team => team.get({plain: true}) )

    res.render('team-page', {
      teams,
      loggedIn: req.session.loggedIn
    })
  })
});

module.exports = router;