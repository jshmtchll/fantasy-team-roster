const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Team, User, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    console.log('==========Team=============')
    Post.findAll({
        attributes:
        'id',
        '_url'
    });
});

module.exports = router;