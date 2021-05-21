const router = require('express').Router();
const { Team, TeamMember } = require('../models/')
const sequelize = require('../config/connection');
const { post } = require('./api');

router.get('/', (req, res) => {
  TeamMember.findAll({
    attributes: [
      'first_name',
      'last_name',
      'sports_team_name',
      'position_played'
    ],
    include: [
      {
        models: Team,
        attributes: [
          'team_name',
          'team_type'
        ]
      }
    ]
  })
  .then(results => {
    const teamMembers = results.map(teamMember => post.get({plain: true}) )

    res.render('homepage', {
      teamMembers,
      loggedIn: req.session.loggedIn
    })
  })
});

module.exports = router;