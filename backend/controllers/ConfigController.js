let  Config = require('../models/config');
let fs = require('fs');
let path = require('path');

const createConfigAdmin = async (req, res) => {

    if(req.user){

        if(req.user.role == 'admin'){

            try {
                await Config.create({
                    categorias: [],
                    titulo: 'Createx',
                    logo: 'logo.png',
                    serie: '0001',
                    correlativo: '000001'
                });

                return res.status(200).json({ message: 'Configuracion creada correctamente' });
            } catch (error) {

                res.status(500).json({ message: error.message});
            }
        }else {

            return res.status(500).json({ message: 'NoAccess - Cofig Role' });
        }
    }else{

        return res.status(500).json({ message: 'NoAccess - User' });
    }
}

const obtenerConfigAdmin = async (req, res) => {
    if(req.user){
        if(req.user.role =='admin'){

            try {

                let reg = await Config.findById('65277819b8c4bc0da2fdc613');
                return res.status(200).json({ data:reg });

            }catch(error){

                res.status(500).json({ message: error});
            }
        }else{

            return res.status(200).send({ data: reg });
        }
    }else{

        res.status(500).json({ message: 'NoAccess' });
    }
}

const actualizarConfigAdmin = async (req, res) => {
    if(req.user){

        if(req.user.role == 'admin'){

            let data = req.body;

            if(req.files){

                console.log('Si hay img');
                let imgPath = req.files.logo.path;
                console.log(imgPath);

                let name = imgPath.split(path.sep);
                let logoName = name[2];


                let reg = await Config.findByIdAndUpdate({_id:"65277819b8c4bc0da2fdc613"},{
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logoName,
                    correlativo: data.correlativo,
                });

                fs.stat('./uploads/configuraciones/'+reg.logo, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/'+reg.logo, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                return res.status(200).send({ data: reg });
            }else{

                console.log('No hay img');
                let reg = await Config.findByIdAndUpdate({_id:"65277819b8c4bc0da2fdc613"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                 });
                return res.status(200).send({ data:reg });
            }
        }else{

            res.status(500).json({message: 'NoAccess'});
        }
    }else{

        res.status(500).json({message: 'NoAccess'});
    }
}

const obtenerLogo = async (req, res) => {

    let img = req.params['img'];

    console.log(img);

    fs.stat('./uploads/configuraciones/'+img, function(err){
        if(!err){

            let pathImg = './uploads/configuraciones/'+img;
            return res.status(200).sendFile(path.resolve(pathImg));
        }else{

            let pathImg = './uploads/default.jpg';
            return res.status(200).sendFile(path.resolve(pathImg));
        }
    })
}

const obtenerConfigPublico = async function(req, res){

    let reg = await Config.findById({_id:"65277819b8c4bc0da2fdc613"});
    return res.status(200).json(reg);
}

module.exports = {
    createConfigAdmin,
    obtenerConfigAdmin,
    actualizarConfigAdmin,
    obtenerLogo,
    obtenerConfigAdmin,
    obtenerConfigPublico
}