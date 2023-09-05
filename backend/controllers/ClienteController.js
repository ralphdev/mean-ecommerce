'use strict'

let Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-node');

const registroCliente = async (req, res) => {

    let data = req.body;
    let clientesArr = [];

    clientesArr = await Cliente.find({
        email: data.email
    });

    if(clientesArr.length == 0){

        if(data.password){
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    return res.status(200).send({message: reg});
                } else {
                    return res.status(200).send({message: 'Error Server', data:undefined});
                }
            });
        } else {
            return res.status(200).send({message: 'No hay Contraseña', data:undefined});
        }
    } else {
        return res.status(200).send({message: 'El correo ya existe en la base de datos', data:undefined});
    }
}

const Init = async (req, res) => {

   res.status(200).send({message: 'Hola Mundo'});
}

module.exports = {
    Init,
    registroCliente
}