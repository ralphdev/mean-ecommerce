'use strict'

let express = require('express');
let clienteController = require('../controllers/ClienteController');

let api = express.Router();
let auth = require('../middlewares/auth');

api.post('/login-cliente', clienteController.loginCliente);
api.post('/registro-cliente',clienteController.registroCliente);

//** Administración de Clientes */
api.get('/listar-clientes-filtro-admin/:tipo/:filtro?', auth.auth, clienteController.listarClientesFiltroAdmin);
api.post('/registro-cliente-admin', auth.auth, clienteController.registroClienteAdmin);
api.get('/obtener-cliente-admin/:id', auth.auth, clienteController.obtenerClienteAdmin);
api.put('/actualizar-cliente-admin/:id', auth.auth, clienteController.actualizarClienteAdmin);
api.delete('/eliminar-cliente-admin/:id', auth.auth, clienteController.eliminarClienteAdmin);

//* PERFIL
api.get('/obtener-cliente-guest/:id', auth.auth, clienteController.obtenerClienteGuest);

module.exports = api;
