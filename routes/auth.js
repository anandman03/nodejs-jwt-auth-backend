const express = require('express');
const app = express();

const authController = require('../controllers/authController');


app.post('/signup', authController.postSignup);

app.post('/login', authController.postLogin);

app.delete('/logout', authController.deleteLogout);

app.post('/token', authController.postToken);

module.exports = app;