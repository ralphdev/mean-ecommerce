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
api.get('/obtener-producto-admin/:id', auth.auth, productoController.obtenerProductoAdmin);
api.put('/actualizar-producto-admin/:id', [ auth.auth, path ], productoController.actualizarProductoAdmin);
api.delete('/eliminar-producto-admin/:id', auth.auth, productoController.eliminarProductoAdmin);

//** INVENTARIO
api.get('/listar-inventario-producto-admin/:id', auth.auth, productoController.listarInventarioProductoAdmin);
api.post('/registro-inventario-producto-admin', auth.auth, productoController.registroInventarioProductoAdmin);
api.delete('/eliminar-inventario-producto-admin/:id', auth.auth, productoController.eliminarInventarioProductoAdmin);

//* VARIEDADES
api.put('/actualizar-producto-variedades-admin/:id', auth.auth, productoController.actualizarProductoVariedadesAdmin);

//* GALERIA
api.put('/agregar-imagen-galeria-admin/:id',[ auth.auth,path ], productoController.agregarImgGaleriaAdmin);
api.put('/eliminar-imagen_galeria-admin/:id', auth.auth, productoController.eliminarImgGaleriaAdmin);

//* E-Commerce
api.get('/listar-productos-publico/:filtro?', productoController.listarProductosPublico);
api.get('/obtener-reviews-producto-publico/:id', productoController.obtenerReviewsPublico);


module.exports = api;