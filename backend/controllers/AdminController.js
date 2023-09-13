'use strict'

let admin = require('../models/admin');
const bcrypt = require('bcrypt-node');
const jwt = require('../helpers/jwt');

const registroAdmin = async (req, res) => {

    let data = req.body;
    let adminArr = [];

    adminArr = await admin.find({
        email: data.email
    });

    if(adminArr.length == 0){

        if(data.password){
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if(hash){
                    data.password = hash;
                    let reg = await admin.create(data);
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

    try {

        let adminData = await admin.findOne({ email: data.email });

        if(!adminData){

            return res.status(400).json({
                error: true,
                message: 'No se encontró el correo', 
            });
        }
        else {

            const validPassword = bcrypt.compareSync(data.password, adminData.password);
                
            if(!validPassword) {

                return res.status(400).json({
                    error: true,
                    message: 'La contraseña no coincide'
                });
            }
            else {

                console.log(adminData.role, 'else valid');
                
                const token = await jwt.generateToken(adminData);
                
                return res.status(200).json({
                    adminData,
                    token
                });
            }
            
        }

    } catch(error) {
        return res.status(500).json({
            message: "Contact Admin -- Problem with the Backend",
        });
    }
}

module.exports = {
    registroAdmin,
    loginAdmin
}