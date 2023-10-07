'use strict'

let express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();
let auth = require('../middlewares/auth');

api.post('/login-cliente', clienteController.loginCliente);

//** Administración de Clientes */
api.get('/listar-clientes-filtro-admin/:tipo/:filtro?', auth.auth, clienteController.listarClientesFiltroAdmin);

api.post('/registro-cliente', auth.auth, clienteController.registroClienteAdmin);

api.get('/obtener-cliente-admin/:id', auth.auth, clienteController.obtenerClienteAdmin);

api.put('/actualizar-cliente-admin/:id', auth.auth, clienteController.actualizarClienteAdmin);


module.exports = api;
