const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class TeamMember extends Model {} 

TeamMember.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // name of sports team they play for
        sports_team_name: {
            type: DataTypes.STRING,
            allowNull: true
            // allowing null in case they dont belong to a team
        },
        position_played: {
            type: DataTypes.STRING,
            allowNull: false
        },
        win_percent: {
            type: DataTypes.DECIMAL,
            // we could allow null for all stats or require them depending on if we use an api or not
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // here we can decide which kinds of stats we would want to add
        team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'team_member'
    }
);

module.exports = TeamMember;