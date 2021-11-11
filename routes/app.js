const express = require('express');
const app = express();

const authenticateToken = require('../helpers/validateToken');
const appController = require('../controllers/appController');

app.get('/', authenticateToken, appController.getPosts);

module.exports = app;