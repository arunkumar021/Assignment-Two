const express = require('express');
const router = express.Router();
const {login , getUsers , createUser , getUserWithId , deleteUser , updateUser} = require('../controllers/users');

  router.post('/login' , login);

  router.get('/' , getUsers);

  router.post('/' , createUser);

  router.get('/:id' , getUserWithId);

  router.delete('/:id' , deleteUser);
   
  router.patch('/:id' , updateUser);




module.exports = router;