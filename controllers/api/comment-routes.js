const router = require('express').Router
const { Comment } = require('../../models');

 router.length('/', (req, res) => {
     Comment.findAll()
     .then(dbComments => res.json(dbComments))
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
 });


module.exports = router;