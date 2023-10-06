'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'ralphdev';

exports.auth = function (req, res, next) {

  if (!req.headers.authorization) {

    return res.status(403).json({ message: 'NoHeadersError' });
  }

  const token = req.headers.authorization.replace(/['"]+/g,'');

  let segment = token.split('.');

  if(segment.length != 3){

    return res.status(403).json({ message: 'InvalidToken' });
  }else{

    try {

      let payload = jwt.decode(token, secret);


      if (payload.exp <= moment().unix()) {
        return res.status(403).json({ message: 'TokenExpirado' });
      }

      req.user = payload;

      next();

    } catch (error) {
        return res.status(403).send({ message: 'InvalidToken' });
    }
  }



}
