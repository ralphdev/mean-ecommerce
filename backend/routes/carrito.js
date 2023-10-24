'use strict'

var express = require('express');
var carritoController = require('../controllers/CarritoController');

var api = express.Router();
var auth = require('../middlewares/auth');

api.post('/agregar-carrito-cliente', auth.auth, carritoController.agregarCarritoCliente);
api.get('/obtener-carrito-cliente/:id',auth.auth, carritoController.obtenerCarritoCliente);
api.delete('/eliminar-carrito-cliente/:id', auth.auth, carritoController.eliminarCarritoCliente);
api.delete('/limpiar-carrito-cliente',auth.auth, carritoController.limpiarCarritoCliente);

module.exports = api;