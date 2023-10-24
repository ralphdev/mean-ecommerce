const Carrito = require('../models/carrito');

const agregarCarritoCliente = async (req, res) => {

    if(req.user){

        let data = req.body;

        //** Agregar a colección
        //** No productos iguales en el carro
        let carritoCliente = await Carrito.find({ cliente: data.cliente, producto:data.producto });

        if(carritoCliente.length == 0){

            let query = await Carrito.create(data);
            return res.status(200).send(query);
        }
        else if(carritoCliente.length >= 1){
            return res.status(200).send({ data:undefined });
        }
        else {
            return res.status(401).json({ message:'no esta autorizado' });
        }
    }
    else{
        return res.status(500).send({message: 'NoAccess'});
    }
}

const obtenerCarritoCliente = async (req, res) => {
    if(req.user){

        let id = req.params['id'];
        //** Agregar a colección
        //** No productos iguales en el carro
        let query = await Carrito.find({cliente: id}).populate('producto');

        //** Enviando la data al frontend
        return res.status(200).send(query);

    }else{
        return res.status(500).send({message: 'NoAccess'});
    }
}

const eliminarCarritoCliente = async (req, res) => {

    if(req.user){

        let id = req.params['id'];
        //** Agregar a colección
        //** No productos iguales en el carro
        let query = await Carrito.findByIdAndRemove({ _id:id });
        return res.status(200).send(query);
    }
    else{
        return res.status(500).send({message: 'NoAccess'});
    }
}

const limpiarCarritoCliente = async (req, res) => {

    if(req.user){

        console.log(req.user.sub);
        let id = req.user.sub;
        //** Agregar a colección
        //** No productos iguales en el carro
        try{
            let reg = await Carrito.deleteMany({ cliente:id });
            return res.status(200).send({ data:reg });
            res.send(req.user.sub);
        }catch(e){
            return res.status(500).send(e)
        }
    }else{
        return res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    agregarCarritoCliente,
    obtenerCarritoCliente,
    limpiarCarritoCliente,
    eliminarCarritoCliente
}