const User = require('./User');
const Comment = require('./Comment');
const Team = require('./Team');
const TeamMember = require('./TeamMember');
const Vote = require('./Vote');

User.hasMany(Team, {
    foreignKey: 'user_id'
});

Team.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "SET NULL"
});

User.belongsToMany(Team, {
    through: Vote,
    as: 'voted_teams',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Team.belongsToMany(User, {
    through: Vote,
    as: 'voted_teams',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Team, {
    foreignKey: 'team_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Team.hasMany(Vote, {
    foreignKey: 'team_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Team, {
    foreignKey: 'team_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Team.hasMany(Comment, {
    foreignKey: 'team_id'
});

TeamMember.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

TeamMember.belongsTo(Team, {
    foreignKey: 'team_id',
    onDelete: 'SET NULL'
});

User.hasMany(TeamMember, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Team.hasMany(TeamMember, {
    foreignKey: 'team_id'
});

module.exports = { User, Comment, Vote, Team, TeamMember }; 