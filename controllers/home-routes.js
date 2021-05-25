const router = require('express').Router();
const { Team, TeamMember } = require('../models/')
const sequelize = require('../config/connection');
const { index } = require('./api');



router.get('/', (req, res) => {
  Team.findAll({
    attributes: [
      'team_type',
      'team_name'
    ],
    include: [
      {
        model: TeamMember,
        attributes: ['first_name', 'last_name', 'sports_team_name', 'position_played', 'win_percent', 'age']
      }
    ]
  })
  .then(results => {
    const teams = results.map(post => post.get({ plain: true }));

    res.render('homepage', {
      teams,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});


// router.get('/', (req, res) => {
//   TeamMember.findAll({
//     attributes: [
//       'first_name',
//       'last_name',
//       'sports_team_name',
//       'position_played'
//     ],
//     include: [
//       {
//         models: Team,
//         attributes: [
//           'team_name',
//           'team_type'
//         ]
//       }  
//     ]
//   })
//   .then(results => {
//     const teamMembers = results.map(teamMember => post.get({plain: true}) )

//     res.render('homepage', {
//       teamMembers,
//       loggedIn: req.session.loggedIn
//     })
//   })
// });

module.exports = router;