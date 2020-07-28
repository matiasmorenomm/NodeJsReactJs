
/* Requiero express */
var express = require('express');
var jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

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
routes.get('/libro', auth.isAuth ,libroController.libros)
routes.get('/libro/:id', libroController.libro)
routes.put('/libro/:id', libroController.actualizar)
routes.delete('/libro/:id', libroController.eliminar)
routes.get('/libroB/:ano/:idioma', libroController.busqueda)

/* Rutas para Usuario */
routes.post('/usuario', auth.isAuth,usuarioController.guardar)
routes.post('/login',usuarioController.login)


module.exports = routes;