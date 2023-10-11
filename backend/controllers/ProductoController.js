'use strict'

var Producto = require('../models/producto');
var Inventario = require('../models/inventario')
var Review = require('../models/review');
var path = require('path');
var fs = require('fs');


//** Registrar Producto */
const registroProductoAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let data = req.body;

      let imgPath = req.files.portada.path;
      let name = imgPath.split('\\');
      let portadaName = name[2];

      data.slug = data.titulo.lowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      data.portada = portadaName;

      try {

        let reg = await Producto.create(data);

        let inventario = await Inventario.create({
          admin: req.user.sub,
          cantidad: data.stock,
          proveedor: 'Primer registro',
          producto: reg._id
        });

        res.status(200).json({
          data: reg,
          inventario: inventario
        });


      } catch (error) {

        return res.status(500).json({
          message: "Contact Admin -- Problem with the Backend",
        });
      }
    } else {

      res.status(500).json({ message: 'NoAccess' });
    }
  } else {
    res.status(500).json({ message: 'NoAccess' });
  }
}

module.exports = {
  registroProductoAdmin
};
