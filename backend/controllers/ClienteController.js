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

/**
 * Funcion de parte del Administrador para filtrar clientes
 * @param {*} req
 * @param {*} res
 * @returns
 */
const listarClientesFiltroAdmin = async(req, res) => {

    console.log('usuario: ', req.user);

    try {

        if (req.user) {

            if (req.user.role == 'admin') {

                let tipo = req.params['tipo'];
                let filtro = req.params['filtro'];

                console.log(tipo);

                if (tipo == null || tipo == 'null') {

                    let reg = await Cliente.find();
                    return res.status(200).json({ data: reg });

                } else {

                    if (tipo == 'apellidos') {

                        let reg = await Cliente.find({ apellidos: new RegExp(filtro, 'i') });
                        return res.status(200).json({ data: reg });
                    }
                    else if (tipo == 'correo') {

                        let reg = await Cliente.find({ email: new RegExp(filtro, 'i') });
                        return res.status(200).json({ data: reg });
                    }
                }
            } else {

                return res.status(500).json({ message: 'NoAccess' });
            }

        } else {

            return res.status(500).json({ message: 'NoAccess'});
        }

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
