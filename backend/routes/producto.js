'use strict'

let express = require('express');
let productoController = require('../controllers/ProductoController');

let api = express.Router();
let auth = require('../middlewares/auth');

let multiParty = require('connect-multiparty');
let path = multiParty({  uploadDir: './uploads/productos' });


//** PRODUCTOS
api.post('/registro-producto-admin', [auth.auth, path], productoController.registroProductoAdmin);
api.get('/listar-productos-admin/:filtro?', auth.auth, productoController.listarProductosAdmin);
api.get('/obtener-portada/:img', productoController.obtenerPortadaProducto);

module.exports = api;
