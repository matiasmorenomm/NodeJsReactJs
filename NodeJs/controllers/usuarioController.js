var Usuario = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function guardar(req, res) {
  let usuario = new Usuario()

  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.email = req.body.email
  usuario.pass = req.body.pass

  usuario.save((err, usuarioStore) => {
    if (err) return res.status(500).send(`Error base de datos ${err}`)
    return res.status(200).send({
      usuario: usuarioStore
    })
  })
}

function login(req, res) {
  let email = req.body.email
  let pass = req.body.pass
  
    Usuario.findOne({
      email: email
    }).exec((err, usuario) => {
      if (err || !usuario) return res.status(400).send({ message: 'El usuario no existe'})
  
      bcrypt.compare(pass, usuario.pass, function (err, result) {
        if (result) {
          var token = jwt.sign({usuario}, 'clavesecreta');
          return res.status(200).send({
            token: token
          })
        } else {
          return res.status(404).send({ message: 'La contraseña no es correcta'})
        }
      })
    })
}

module.exports = {
  guardar,
  login
}