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
<<<<<<< HEAD
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
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(results => {
            req.session.save(() => {
                req.session.user_id = results.id;
                req.session.username = results.username;
                req.session.loggedIn = true;

                res.json(results)
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.put('/:id', (req, res) => {
    Team.update(

    )
})

router.delete(':/id', (req, res) => {
=======
    .then(dbTeamData => res.json(dbTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get a single team
router.get('/:id', (req, res) => {
    Team.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'team_name',
            'team_type',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHEREteam.id = vote.team_id)'), 'vote_count']
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
        if (!dbTeamData) {
            res.status(404).json({ message: 'No team found with this id' })
            return;
        }
        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a team
router.post('/',  (req, res) => {
    Team.create({
        team_name: req.body.team_name,
        team_type: req.body.team_type
    })
    .then(dbTeamData => res.json(dbTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/upvote', withAuth, (req, res) => {
    // custom static method created in models/Team.js
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.put('/:id', withAuth, (req, res) => {
    Team.update(
        {
            team_name: req.body.team_name,
            team_type: req.body.team_type,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbTeamData => {
        if (!dbTeamData) {
            res.status(404).json({ message: 'No team found' });
            return;
        }
        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
>>>>>>> e37b2ad20be560d8c3ea4e5d86c039eac1d02ef8
    Team.destroy({
        where: {
            id: req.params.id
        }
<<<<<<< HEAD
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

=======
    })
    .then(dbTeamData => {
        if (!dbTeamData) {
            res.status(404).json({ message: 'No team found' })
            return;
        }
        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


>>>>>>> e37b2ad20be560d8c3ea4e5d86c039eac1d02ef8
module.exports = router;