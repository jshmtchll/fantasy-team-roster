const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          team_id: body.team_id
        }).then(() => {
          return Team.findOne({
            where: {
              id: body.team_id
            },
            attributes: [
              'id',
              'team_name',
              'team_type',
              'created_at',
              [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE team.id = vote.team_id)'), 'vote_count']
            ],
            include: [
              {
                model: models.Comment,
                attributes: ['id', 'comment_text', 'team_id', 'user_id', 'created_at'],
                include: {
                  model: models.User,
                  attributes: ['username']
                }
              }
            ]
          });
        });
      }
}

Team.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // user given name for their team
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // type of sport the team is composed of
        team_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'team'
    }
);

module.exports = Team;