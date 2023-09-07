'use strict'

let Admin = require('../models/admin');
const bcrypt = require('bcrypt-node');

const registroAdmin = async (req, res) => {

    let data = req.body;
    let adminArr = [];

    adminArr = await Admin.find({
        email: data.email
    });

    if(adminArr.length == 0){

        if(data.password){
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if(hash){
                    data.password = hash;
                    let reg = await Admin.create(data);
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

const loginAdmin = async(req, res) => {

    let data = req.body;
    let AdminArr = [];

    AdminArr = await Admin.find({ email: data.email });

    if(AdminArr.length == 0){
        return res.status(200).send({message: 'No se encontró el correo', data: undefined});
    }
    else {
        let user  = AdminArr[0];

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
    registroAdmin,
    loginAdmin
}