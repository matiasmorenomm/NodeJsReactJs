
/* Requiero express */
var express = require('express');

/* Requiero controller */
var libroController = require('../controllers/libroController');

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

module.exports = routes;