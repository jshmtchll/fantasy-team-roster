const router = require('express').Router();
const { User, Team, Comments, Vote } = require('../../models');


router.get('/', (req, res) => {
  res.render('add-user');
})

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(results => res.json(results))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  User.findOne({
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
      res.status(404).json({ message: 'No user found'})
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
  User.create({
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

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(results => {
    if (!results) {
      res.status(400).json({ message: 'No user with this email address' })
      return;
    }
    
    const validate = results.checkPassword(req.body.password)

    if (!validate) {
      res.status(400).json({ message: 'Incorrect Password' })
      return
    }

    req.session.save(() => {
      req.session.user_id = results.id;
      req.session.username = results.username;
      req.session.loggedIn = true;

      res.json({ message: 'You are now logged in'})
    })
  })
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  }
  else {
    res.status(400).end()
  }
})

router.delete(':/id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(results => {
    if (!results) {
      res.status(404).json({ message: 'No player found' })
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