'use strict';
// userRoute
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', [
  body('name', 'vähintään 3 merkkiä').isLength({min: 3}).escape(),
  body('email', 'kunnollinen sähköposti').isEmail(),
  body('passwd',
      'minimum length 8 characters, at least one capital letter').matches(
      '(?=.*[A-Z]).{8,}'),
], userController.user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;
