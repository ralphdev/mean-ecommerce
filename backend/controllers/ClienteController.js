'use strict'

let Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-node');
const jwt = require('../helpers/jwt');

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

    try {

        let clienteData = await Cliente.findOne({ email: data.email });

        if(!clienteData){

            return res.status(400).json({
                error: true,
                message: 'No se encontró el correo', 
            });
        }
        else {

            const validPassword = bcrypt.compareSync(data.password, clienteData.password);
                
            if(!validPassword) {

                return res.status(400).json({
                    error: true,
                    message: 'la contraseña no coincide'
                });
            }
            else {
                
                const token = await jwt.generateToken(clienteData);
                
                return res.status(200).json({
                    clienteData,
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

const listarClientesFiltroAdmin = async(req, res) => {

    let data = await Cliente.find();

    try {
        return res.status(200).json({
            data
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Contact Admin -- Problem with the Backend",
        });
    }
} 


module.exports = {
    registroCliente,
    loginCliente,
    listarClientesFiltroAdmin
}