const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const teamRoutes = require('./team-routes');

router.use('/users', userRoutes);
router.use('/posts', commentRoutes);
router.use('/comments', teamRoutes);

module.exports = router;