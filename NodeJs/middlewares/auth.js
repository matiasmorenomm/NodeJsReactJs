'use strict'
const jwt = require('jsonwebtoken');

function isAuth(req, res, next){
  if(!req.headers.authorization) {
    return res.status(403).send({message: 'No existe autorizacion'})
  }

  var token = req.headers.authorization;
  token = token.replace(/['"]+/g, '');

  try {
    jwt.verify(token, 'clavesecreta')
  } catch (error) {
    return res.status(401).send({ message: 'El token no es valido'});
  }

  var edcode = jwt.decode(token)
  console.log(edcode)

  next();
}

module.exports = {
  isAuth
}