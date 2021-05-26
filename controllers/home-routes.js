const router = require('express').Router();
const { Team, TeamMember } = require('../models/')
const sequelize = require('../config/connection');
const { index } = require('./api');



router.get('/', (req, res) => {
 res.render('homepage');
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