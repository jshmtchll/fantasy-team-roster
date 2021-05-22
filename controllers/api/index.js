const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const teamRoutes = require('./team-routes');
const teamMemberRoutes = require('./team-member-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/comments', commentRoutes);
router.use('/team-members', teamMemberRoutes);

module.exports = router;