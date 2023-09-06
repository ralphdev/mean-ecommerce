'use strict'

const express = require('express');
const app = express();

let bodyparser = require('body-parser');

const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

let clienteRoute = require('./routes/cliente');
let adminRoute = require('./routes/admin');

try {

    mongoose.connect('mongodb://ralphdev:secret@127.0.0.1:27017/shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( () =>  console.log(`MongoDB Connected ${port}`) );


} catch (error){
    console.error(error.message);
    process.exit(1);
}

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit:'50mb', extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});


app.use('/api', clienteRoute);
app.use('/api', adminRoute);

app.listen(port, (err) => {
    if(err){
        console.err('Ha habido un error ' + err);
    }
    else{
        console.log('Servidor ejecutandose en el puerto ' + port);
    }   
});

module.exports = app;
