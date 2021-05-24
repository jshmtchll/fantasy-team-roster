const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Team, User, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    Team.findAll({
        attributes: ['id', 'team_name', 'team_type', 'user_id', 'create_at']
    })
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});
 
  router.get('/:id', (req, res) => {
    Team.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Team,
          attributes: ['team_type', 'team_name']
        },
        {
          model: Comments,
          attributes: [''],
          include: {
            model: Team,
            attributes: ['team_name']
          }
        },
        {
          model: Team,
          attributes: ['team_name'],
          through: Vote,
          as: ''
        }
      ]
    })
    .then(results => {
      if (!results) {
        res.status(404).json({ message: 'No team found'})
        return
      }
      res.json(results)
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err)
      }
    })
  });
  
  router.post('/', (req, res) => {
    Team.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(results => {
      req.session.save(() => {
        req.session.user_id = results.id;
        req.session.username = results.username;
        req.session.loggedIn = true;
  
        res.json(results)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  });
  
  router.put('/:id', (req, res) => {
      Team.update(

      )
  })
  
  router.delete(':/id', (req, res) => {
    Team.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(results => {
      if (!results) {
        res.status(404).json({ message: 'No team found' })
        return
      } 
      res.json(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  });
   
module.exports = router;