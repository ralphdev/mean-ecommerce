'use strict'

let Producto = require('../models/producto');
let Inventario = require('../models/inventario')
let Review = require('../models/review');

let path = require('path');
let fs = require('fs');


//** Registrar Producto */
const registroProductoAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let data = req.body;

      let imgPath = req.files.portada.path;
      let name = imgPath.split(path.sep);
      let portadaName = name[2];

      data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      data.portada = portadaName;

      try {

        console.log('sub ',req.user.sub);

        let reg = await Producto.create(data);

        let inventario = await Inventario.create({
          admin: req.user.sub,
          cantidad: data.stock,
          proveedor: 'Primer registro',
          producto: reg._id
        });

        return res.status(200).send({
          data: reg,
          inventario: inventario
        });


      } catch (error) {

        console.log(error);

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

const listarProductosAdmin = async (req, res) => {
  if(req.user){

      if(req.user.role == 'admin'){

        let filtro = req.params['filtro'];

        let reg = await Producto.find({ titulo: new RegExp(filtro, 'i') });
        return res.status(200).send({ data: reg });

      }else{
        res.status(500).send({ message: 'NoAccess' });
      }
  }else{
    res.status(500).send({message: 'NoAccess'});
  }
}

const obtenerPortadaProducto = async (req, res) => {

  let img = req.params['img'];

  fs.stat('./uploads/productos/'+img, function(err){

    if(!err){

      let pathImg = './uploads/productos/'+img;
      return res.status(200).sendFile(path.resolve(pathImg));
    }else{

      let pathImg = './uploads/default.jpg';
      return res.status(200).sendFile(path.resolve(pathImg));
  }
  });
}

const obtenerProductoAdmin = async (req, res) => {
  if (req.user){

    if(req.user.role == 'admin'){

      let id = req.params['id'];

      try {
        var reg = await Producto.findById({_id:id});

        return res.status(200).send({ data:reg });
      }catch (error){

        return res.status(200).send({data:undefined})
      }

    }else{
      return res.status(500).send({ message: 'NoAccess' });
    }
  }else{
    return res.status(500).send({ message: 'NoAccess' });
  }
}

const actualizarProductoAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {
      let id = req.params['id'];
      let data = req.body;

      if (req.files) {

        //si hay img
        let imgPath = req.files.portada.path;
        let name = imgPath.split(path.sep);
        let portadaName = name[2];

        let reg = await Producto.findByIdAndUpdate({ _id: id },{
          titulo: data.titulo,
          stock: data.stock,
          precio: data.precio,
          categoria: data.categoria,
          descripcion: data.descripcion,
          contenido: data.contenido,
          portada: portadaName
        });

        fs.stat('./uploads/productos/' + reg.portada, (err) => {
          if (!err) {
            fs.unlink('./uploads/productos/' + reg.portada, (err) => {
              if (err) throw err;
            });
          }
        });

        return res.status(200).send({ data: reg });
      } else {

        //no hay img
        let reg = await Producto.findByIdAndUpdate({_id:id},{
          titulo: data.titulo,
          stock: data.stock,
          precio: data.precio,
          categoria: data.categoria,
          descripcion: data.descripcion,
          contenido: data.contenido,
        });

        return res.status(200).send({ data: reg });
      }
    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

const eliminarProductoAdmin = async (req, res) => {

  if(req.user){

      if(req.user.role == 'admin'){

        let id = req.params['id']
        let reg = await Producto.findByIdAndRemove({_id:id});

        fs.stat('./uploads/productos/' + reg.portada, (err) => {
          if (!err) {
              fs.unlink('./uploads/productos/' + reg.portada, (err) => {
                if (err) throw err;
              });
          }
        });

        return res.status(200).send({data:reg});
      }else{

        return res.status(500).send({message: 'NoAccess'});
      }
  }else{
    res.status(500).send({message: 'NoAccess'});
  }
}

//** Inventario */
const listarInventarioProductoAdmin = async (req, res) => {

  if(req.user){

    if(req.user.role == 'admin'){

      let id = req.params['id']

      let reg = await Inventario.find({
        producto: id
      })
      .populate('admin')
      .sort({ createdAt:-1 });

      return res.status(200).send({ data:reg })
    }else{
      return res.status(500).send({ message: 'NoAccess' });
    }
  }else{
    return res.status(500).send({ message: 'NoAccess' });
  }
}

const registroInventarioProductoAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let data = req.body;

      let reg = await Inventario.create(data);
      //* obtener el registro del producto
      let prod = await Producto.findById({ _id:reg.producto });
      //* calcular nuevo stock
      //* stock actual                      //* stock a aumentar
      let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);

      //* actualizacion del nuevo stock al producto
      let producto = await Producto.findByIdAndUpdate({ _id:reg.producto }, {
        stock: nuevo_stock
      });

      return res.status(200).send({ data: reg });


    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

const eliminarInventarioProductoAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

        //* obtner id inventario
        let id = req.params['id'];
        //* eliminar inventario
        let reg = await Inventario.findByIdAndRemove({_id:id});
        //obtener el registro del producto
        let prod = await Producto.findById({_id:reg.producto});

        //* calcular nuevo stock
        let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);

        //* actualizacion del nuevo stock al producto
        let producto = await Producto.findByIdAndUpdate({_id:reg.producto },{
          stock: nuevo_stock
        });

        return res.status(200).send({ data: producto });
    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

//** Variedades */
const actualizarProductoVariedadesAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let id = req.params['id'];
      let data = req.body;

      let reg = await Producto.findByIdAndUpdate({ _id: id }, {
          titulo_variedad: data.titulo_variedad,
          variedades: data.variedades
      });
      return res.status(200).send({ data: reg });

    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

//** Galerías */
const agregarImgGaleriaAdmin = async (req, res) => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let id = req.params['id'];
      let data = req.body;

      let imgPath = req.files.imagen.path;
      let name = imgPath.split(path.sep);
      let imagenName = name[2];

      let reg = await Producto.findByIdAndUpdate({ _id: id }, {
        $push: {
          galeria: {
            imagen: imagenName,
            _id: data._id
          }
        }
      });

      return res.status(200).send({ data: reg });

    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

const eliminarImgGaleriaAdmin = async (req, res)  => {

  if (req.user) {

    if (req.user.role == 'admin') {

      let id = req.params['id'];
      let data = req.body;

      let reg = await Producto.findByIdAndUpdate({ _id: id }, { $pull: { galeria: { _id: data._id } } });

      return res.status(200).send({ data: reg });

    } else {
      return res.status(500).send({ message: 'NoAccess' });
    }
  } else {
    return res.status(500).send({ message: 'NoAccess' });
  }
}

//** E-commerce

const listarProductosPublico = async (req, res) => {

  let filtro = req.params['filtro'];

  let reg = await Producto.find({ titulo: new RegExp(filtro, 'i')}).sort({ createdAt: -1 });
  return res.status(200).send(reg);

}

//** Reviews */
const obtenerReviewsPublico = async (req,res) => {

  let id = req.params['id'];

  let reviews = await Review.find({ producto:id }).populate('cliente').sort({ createdAt:-1 });

  return res.status(200).send({data: reviews});
}

module.exports = {
  listarProductosAdmin,
  registroProductoAdmin,
  obtenerPortadaProducto,
  obtenerProductoAdmin,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
  listarInventarioProductoAdmin,
  registroInventarioProductoAdmin,
  eliminarInventarioProductoAdmin,
  actualizarProductoVariedadesAdmin,
  agregarImgGaleriaAdmin,
  eliminarImgGaleriaAdmin,
  listarProductosPublico,
  obtenerReviewsPublico
};
