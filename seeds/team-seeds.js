const sequelize = require('../config/connection');
const { User, Team } = require('../models');

const teamData = [
    {
        team_name: 'Dream Team',
        team_type: 'baseball',
        user_id: 1
    },
    {
        team_name: 'A Team',
        team_type: 'basketball',
        user_id: 2
    },
    {
        team_name: 'We Like Sports',
        team_type: 'Football',
        user_id: 3
    }
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;