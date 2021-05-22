const seedUsers = require('./user-seeds');
const seedTeams = require('./team-seeds');
const seedTeamMembers = require('./team-member-seeds');
const seedComment = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedTeams();
    await seedTeamMembers();
    await seedComment();
    await seedVotes();

    process.exit(0);
};

seedAll();