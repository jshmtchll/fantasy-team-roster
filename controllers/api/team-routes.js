const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Vote, TeamMember, Team } = require('../../models');
const withAuth = require('../../utils/auth');

// get all teams
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
        .then(results => res.json(results))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Team.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Team,
                attributes: ['team_type', 'team_name']
            },
            {
                model: Comments,
                attributes: [''],
                include: {
                    model: Team,
                    attributes: ['team_name']
                }
            },
            {
                model: Team,
                attributes: ['team_name'],
                through: Vote,
                as: ''
            }
        ]
    })
        .then(results => {
            if (!results) {
                res.status(404).json({ message: 'No team found' })
                return
            }
            res.json(results)
        })
        .catch(err => {
            if (err) {
                res.status(500).json(err)
            }
        })
});

router.post('/', (req, res) => {
    Team.create({
      team_name: req.body.team_name,
      team_type: req.body.team_type
    })
    .then(dbTeamData => res.json(dbTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
        res.json(results)
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });

router.put('/:id', (req, res) => {
    Team.update(

    )
})

router.delete(':/id', (req, res) => {
    Team.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(results => {
            if (!results) {
                res.status(404).json({ message: 'No team found' })
                return
            }
            res.json(results)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

module.exports = router;