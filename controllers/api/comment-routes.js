const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbComments => res.json(dbComments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            team_id: req.body.team_id
        })
            .then(dbComments => res.json(dbComments))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbComments => {
                if (!dbComments) {
                    res.status(404).json({ message: 'No Comment Found' });
                    return;
                }
                res.json(dbComments);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});


module.exports = router;