
/* Requiero express */
var express = require('express');
var jwt = require('jsonwebtoken')

/* Requiero controller */
var libroController = require('../controllers/libroController');
var usuarioController = require('../controllers/usuarioController');
const { decode } = require('jsonwebtoken');

/* Instancia routes */
var routes = express.Router();

/* Middleware se ejecuta y muestra el tiempo cada vez que se realiza una peticion a alguna ruta que se encuentre aqui */
routes.use(function timelog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
}); 

/* Definir las rutas para la api */
routes.post('/libro', libroController.guardar)
routes.get('/libro', libroController.libros)
routes.get('/libro/:id', libroController.libro)
routes.put('/libro/:id', libroController.actualizar)
routes.delete('/libro/:id', libroController.eliminar)
routes.get('/libroB/:ano/:idioma', libroController.busqueda)

/* Rutas para Usuario */
routes.post('/usuario', Token,usuarioController.guardar)
routes.post('/login',usuarioController.login)

function Token(req, res, next) {
  var token = req.headers['authorization']
  /* le quita las comillas si es que vienen */
  token = token.replace(/['"]+/g, '');
  /* Valida si es que viene algo en la cabecera con clave authorization */
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    /* Verifica si el token es correcto */
    jwt.verify(token, 'clavesecreta', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        res.send({
          message: 'Token Correcto'
        })
      }
    })
}

module.exports = routes;