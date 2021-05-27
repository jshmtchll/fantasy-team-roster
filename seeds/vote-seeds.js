const { Vote } = require('../models');

const voteData = [
    {
        user_id: 1,
        team_id: 2
    },
    {
        user_id: 2,
        team_id: 1
    }
];

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;