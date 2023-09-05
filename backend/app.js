'use strict'

const express = require('express');
const app = express();

let bodyparser = require('body-parser');

const mongoose = require('mongoose');
const port = process.env.PORT || 4201;

    try {

        mongoose.connect('mongodb://ralphdev:secret@127.0.0.1:27017/shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () =>  console.log(`MongoDB Connected`) );


    } catch (error){
        console.error(error.message);
        process.exit(1);
    }
