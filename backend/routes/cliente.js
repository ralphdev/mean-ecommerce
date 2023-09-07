'use strict'

let express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();


api.post('/registro-cliente', clienteController.registroCliente);
api.post('/login-cliente', clienteController.loginCliente);

module.exports = api;
