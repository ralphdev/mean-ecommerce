'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarioSchema = Schema({

  producto: {type: Schema.ObjectId, ref: 'producto',required: true },
  cantidad: {type: Number, require: true },
  admin: {type: Schema.ObjectId, ref: 'admin',required: true },
  proveedor: {type: String, require: true },
  createdAt:{ type:Date, default:Date.now, require:true }
});

module.exports = mongoose.model('inventario', InventarioSchema);
