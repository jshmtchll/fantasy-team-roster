const sequelize = require('../config/connection');
const { User, Team, TeamMember } = require('../models');
const seedTeams = require('./team-seeds');

const teamMemberData = [
    {
        first_name: 'LeBron',
        last_name: 'James',
        sports_team_name: 'Lakers',
        position_name: 'multiple',
        win_percent: .6,
        age: 36,
        team_id: 1,
        user_id: 1
    },
    {
        first_name: 'Tom',
        last_name: 'Brady',
        sports_team_name: 'Bucaneers',
        position_name: 'Quarterback',
        win_percent: .77,
        age: 43,
        team_id: 2,
        user_id: 2
    }
];

const seedTeamMembers = () => TeamMember.bulkCreate(teamMemberData);

module.exports = seedTeamMembers;