'use strict'

let Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-node');
const jwt = require('../helpers/jwt');

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

                return res.status(200).send({
                    clienteData,
                    token
                });
            }

        }

    } catch(error) {
        return res.status(500).json({
            message: "Contact Admin: " + error,
        });
    }

}

const registroCliente = async (req, res) => {

    var data = req.body;
    var clienteArr = [];

    clienteArr = await Cliente.find({ email:data.email });

    if (clienteArr.length ==0){

        /* var reg = await Cliente.create(data); */
        if(data.password){

            bcrypt.hash(data.password, null, null, async (err, hash) => {

            if(hash){

                data.password =hash;
                var reg = await Cliente.create(data);
                return res.status(200).send({ data:reg });

            }else{
                return res.status(400).send({ message: 'ErrorServer', data:undefined });
            }

            })
        }else{
            return res.status(400).send({ message: 'No hay una contraseña', data:undefined });
        }

    }else{
        return res.status(400).send({ message: 'Este correo ya existe en la base de datos', data:undefined });
    }
}

// ** Funcion de parte del Administrador para filtrar clientes */
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

                        console.log(reg);
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

const registroClienteAdmin = async (req, res) => {

    if(req.user){

        if (req.user.role == 'admin') {

            try {
                let data = req.body;

                bcrypt.hash('123456789', null, null, async (err, hash) => {

                    if (hash) {
                        data.password = hash;

                        let reg = await Cliente.create(data);
                        return res.status(200).send({ message: reg });
                    } else {

                        return res.status(200).json({message: 'Error Server', data:undefined});
                    }
                });
            } catch (error) {

                return res.status(500).json({
                    message: "Contact Admin -- Problem with the Backend",
                });
            }
        } else {

            return res.status(500).json({ message: 'NoAccess' });
        }
    } else {

        return res.status(500).json({ message: 'NoAccess' });
    }
}

const obtenerClienteAdmin = async (req, res) => {

    if(req.user){

        if (req.user.role == 'admin') {

            let id = req.params['id'];

            try {

                let reg = await Cliente.findById({ _id: id });

                return res.status(200).json({ data: reg });
            } catch (error) {

                res.status(200).json({ data: undefined });
            }

        } else {

            return res.status(500).json({ message: 'NoAccess' });
        }
    } else {

        return res.status(500).json({ message: 'NoAccess' });
    }

}

const actualizarClienteAdmin = async (req, res) => {

    try {

        if(req.user){

            if (req.user.role == 'admin') {

                let id = req.params['id'];
                let data = req.body;

                let reg = await Cliente.findByIdAndUpdate({ _id: id }, {
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    email: data.email,
                    telefono: data.telefono,
                    f_nac: data.f_nac,
                    cedula: data.cedula,
                    genero: data.genero
                });

                return res.status(200).send({message: reg});

            } else {

                return res.status(500).json({ message: 'NoAccess' });
            }
        } else {

            return res.status(500).json({ message: 'NoAccess' });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Contact Admin -- Problem with the Backend",
        });
    }
}

const eliminarClienteAdmin = async (req, res) => {

    try {

        if(req.user){

            if (req.user.role == 'admin') {

                let id = req.params['id'];
                let reg = await Cliente.findByIdAndRemove({ _id: id });

                return res.status(200).json({ message: reg });

            } else {

                return res.status(500).json({ message: 'NoAccess' });
            }
        } else {

            return res.status(500).json({ message: 'NoAccess' });
        }

    } catch (error) {

        return res.status(500).json({
            message: "Contact Admin -- Problem with the Backend",
        });
    }
}

const obtenerClienteGuest = async (req, res) => {

    if(req.user){

        let id = req.params['id'];

        try {

            let reg = await Cliente.findById({ _id:id });
            return res.status(200).send({data:reg});

        } catch (error) {
            return res.status(200).send({ data:undefined });
        }

    }else{
        return res.status(500).send({ message: 'NoAccess' });
    }
}


module.exports = {
    loginCliente,
    registroCliente,
    listarClientesFiltroAdmin,
    registroClienteAdmin,
    obtenerClienteAdmin,
    actualizarClienteAdmin,
    eliminarClienteAdmin,
    obtenerClienteGuest
}
