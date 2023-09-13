'use strict'

const jwt = require('jwt-simple');
const momento = require('moment');
let secret = 'ralphdev';

exports.generateToken = async (user) => {
    
    let payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
        iat: momento().unix(),
        exp: momento().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret);
}