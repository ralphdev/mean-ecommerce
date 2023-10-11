'use strict'

let express = require('express');
let productoController = require('../controllers/ProductoController');

let api = express.Router();
let auth = require('../middlewares/auth');

let multiParty = require('connect-multiparty');
let path = multiParty({  uploadDir: './uploads/productos' });


//** PRODUCTOS
api.post('/registro-producto-admin', [auth.auth, path], productoController.registroProductoAdmin);

module.exports = api;
