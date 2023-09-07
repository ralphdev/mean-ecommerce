'use strict'

let express = require('express');
let adminController = require('../controllers/AdminController');

let api = express.Router();

api.post('/registro-admin', adminController.registroAdmin);
api.post('/login-admin', adminController.loginAdmin);

module.exports = api;
