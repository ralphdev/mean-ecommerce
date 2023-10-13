'use strict'

let express = require('express');

let configController = require('../controllers/ConfigController');

let api = express.Router();
let auth = require('../middlewares/auth');
let multiparty = require('connect-multiparty');
let path = multiparty({ uploadDir: './uploads/configuraciones' });

api.post('/reg-config', auth.auth, configController.createConfigAdmin);
api.get('/obtener-config-admin', auth.auth, configController.obtenerConfigAdmin);
api.put('/actualiza-config-admin/:id',[ auth.auth, path ], configController.actualizarConfigAdmin);
api.get('/obtener-logo/:img', configController.obtenerLogo);
api.get('/obtener-config-publico', configController.obtenerConfigPublico);

module.exports = api;