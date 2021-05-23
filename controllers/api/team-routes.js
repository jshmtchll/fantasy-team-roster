const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Team, User, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    Team.findAll({
        attributes: ['id', 'team_name', 'team_type', 'user_id', 'create_at']
    })
});

module.exports = router;