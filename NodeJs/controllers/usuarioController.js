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
    if (err) res.status(500).send(`Error base de datos ${err}`)
    res.status(200).send({
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
    if (err || !usuario) res.status(400).send(`No existe el usuario`)

    bcrypt.compare(pass, usuario.pass, function (err, result) {
      if (result) {
        var token = jwt.sign({usuario}, 'clavesecreta');
        res.status(200).send({
          token: token
        })
      } else {
        res.status(404).send(`La contraseña no es correcta`)
      }
    })
  })
}

module.exports = {
  guardar,
  login
}