const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const teamRoutes = require('./team-routes');
const teamMemberRoutes = require('./team-member-routes');
const dashboardRoutes = require('../dashboard-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/comments', commentRoutes);
router.use('/team-members', teamMemberRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;