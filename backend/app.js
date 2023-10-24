'use strict'

const express = require('express');
const app = express();

let bodyParser = require('body-parser');

const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

//** socket.io Backend y Cliente
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
    cors: {origin: '*'}
});

//** configuracion de Carro Backend
io.on('connection', (socket) =>{

    socket.on('delete-carrito', (data) => {
        io.emit('new-carrito', data);
        console.log('new-carrito',data);
    });

    socket.on('add-carrito-add', (data) => {
        io.emit('new-carrito-add', data);
        console.log('new-carrito-add', data);
    })
});

let adminRoute = require('./routes/admin');
let clienteRoute = require('./routes/cliente');
let productoRoute = require('./routes/producto');
let configRoute = require('./routes/config');
let carritoRoute = require('./routes/carrito');

try {

    mongoose.connect('mongodb+srv://rafadevelopers:nWJkrXRaePNDvQCJ@cluster0.ab7ouej.mongodb.net/mean-shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( () =>  console.log(`MongoDB Connected ${port}`) );

} catch (error){
    console.error(error.message);
    process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit:'50mb', extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});


server.listen(port, (err) => {
    if(err){
        console.err('Ha habido un error ' + err);
    }
    else{
        console.log('Servidor ejecutandose en el puerto ' + port);
    }
});

app.use('/api', adminRoute);
app.use('/api', clienteRoute);
app.use('/api', configRoute)
app.use('/api', productoRoute);
app.use('/api', carritoRoute);


module.exports = app;
