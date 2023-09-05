'use strict'

let express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();

api.get('/init', clienteController.Init);

api.post('/registro-cliente', clienteController.registroCliente);

module.exports = api;
