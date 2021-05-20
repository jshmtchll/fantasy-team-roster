const seedUsers = require('./user-seeds');
const seedTeams = require('./team-seeds'),
const seedTeamMembers = require('./team-member-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedTeams();
    await seedTeamMembers();

    process.exit(0);
};

seedAll();