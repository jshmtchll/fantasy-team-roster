const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Vote, TeamMember, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    TeamMember.findAll({
        attributes: [
            'id',
            'first_name', 
            'last_name',
            'sports_team_name',
            'position_played',
            'win_percent',
            'age',
            'user_id',
            'team_id'
        ]
    })
    .then(dbTeamMemberData => res.json(dbTeamMemberData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
    TeamMember.findOne({
        attributes: [
            'id',
            'first_name', 
            'last_name',
            'sports_team_name',
            'position_played',
            'win_percent',
            'age',
            'user_id',
            'team_id'
        ]
    })
    .then(dbTeamMemberData => {
        if (!dbTeamMemberData) {
            res.status(404).json({ message: 'No team member found' });
            return;
        }
        res.json(dbTeamMemberData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    TeamMember.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sports_team_name: req.body.sports_team_name,
        position_played: req.body.position_played,
        win_percent: req.body.win_percent,
        age: req.body.age,
        user_id: req.body.user_id,
        team_id: req.body.team_id
    })
    .then(dbTeamMemberData => res.json(dbTeamMemberData))
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    TeamMember.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            sports_team_name: req.body.sports_team_name,
            position_played: req.body.position_played,
            win_percent: req.body.win_percent,
            age: req.body.age
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbTeamMemberData => {
        if (!dbTeamMemberData) {
            res.status(404).json({ message: 'No team member found' });
            return;
        }
        res.json(dbTeamMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/:id', withAuth, (req, res) => {
    TeamMember.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTeamMemberData => {
        if (!dbTeamMemberData) {
            res.status(404).json({ message: 'No team member found' })
            return;
        }
        res.json(dbTeamMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;