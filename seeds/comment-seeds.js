const sequelize = require('../config/connection');
const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Nice team!',
        user_id: 1.,
        team_id: 1
        
    },
    {
        comment_text: "Wow, that is such a big team!",
        user_id: 2,
        team_id: 2 
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;