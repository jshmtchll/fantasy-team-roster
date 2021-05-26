const router = require('express').Router();
const { Team, TeamMember } = require('../models/')
const sequelize = require('../config/connection');
const { index } = require('./api');



router.get('/', (req, res) => {
 res.render('homepage');
});



module.exports = router;