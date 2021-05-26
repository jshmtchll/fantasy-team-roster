const router = require('express').Router();
const { User, Team, Comment, TeamMember } = require('../models/');
const sequelize = require('sequelize');

router.get('/', (req, res) => {
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

module.exports = router;