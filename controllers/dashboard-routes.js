const router = require('express').Router();
const { User, Team, Comment, TeamMember } = require('../models/');
const sequelize = require('sequelize');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Team.findAll({
        attributes: [
            'id',
            'team_name',
            'team_type',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE team.id = vote.team_id)'), 'vote_count']
        ],
        include: [
            {
                model: TeamMember,
                attributes: [
                    'first_name', 
                    'last_name',
                    'sports_team_name',
                    'position_played',
                    'win_percent',
                    'age',
                    'user_id',
                    'team_id'
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'team_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTeamData => {
        const teams = dbTeamData.map(team => team.get({ plain: true }));       
        res.render('dashboard', { 
            teams,
            loggedIn: req.session.loggedIn
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/team-view/:id', withAuth, (req, res) => {
    Team.findByPk(req.params.id, {
        attributes: [
            'id',
            'team_name',
            'team_type',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE team.id = vote.team_id)'), 'vote_count']
        ],
        include: [
            {
                model: TeamMember,
                attributes: [
                    'first_name', 
                    'last_name',
                    'sports_team_name',
                    'position_played',
                    'win_percent',
                    'age',
                    'user_id',
                    'team_id'
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'team_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTeamData => {
        if (dbTeamData) {
            const team = dbTeamData.get({ plain: true });
            console.log(team);
            res.render('team-view', {
                team,
                loggedIn: true
            }); 
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

module.exports = router;