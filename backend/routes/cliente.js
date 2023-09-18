'use strict'

let express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();

api.post('/registro-cliente', clienteController.registroCliente);
api.post('/login-cliente', clienteController.loginCliente);

api.get('/listar-clientes-filtro-admin', clienteController.listarClientesFiltroAdmin);

module.exports = api;
