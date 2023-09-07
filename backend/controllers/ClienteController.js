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

const loginCliente = async(req, res) => {

    let data = req.body;
    let clientesArr = [];

    clientesArr = await Cliente.find({ email: data.email });

    if(clientesArr.length == 0){
        return res.status(200).send({message: 'No se encontró el correo', data: undefined});
    }
    else {
        let user  = clientesArr[0];

        bcrypt.compare(data.password, user.password, async (error, check) =>{
            if(check) {

                return res.status(200).send({data:user});
            }
            else {
                return res.status(200).send({message: 'la contraseña no coincide', data: undefined});
            }
        })
    }

}


module.exports = {
    registroCliente,
    loginCliente
}