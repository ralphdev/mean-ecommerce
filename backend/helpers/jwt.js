'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'ralphdev';

exports.generateToken = async (user) => {
    
    let payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment.unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret);
}