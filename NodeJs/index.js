'use strict'

/* Se requiere express */
const express = require('express');
/* Se requiere body parser */
var bodyParser = require('body-parser')
/* Se instancia express */
const app = express()
/* Se requiere mongoose */
var mongoose = require('mongoose')

/* Recibe parametros por urlencoded y json */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

 /* Requiero el archivo que maneja las rutas desde la carpeta routes */
 var routes = require('./routes/routes');

 /* Le asigno a la instancia de express (app) la variable donde se encuentran las rutas(routes) */
 app.use('/api', routes);

 /* Conexion a mongoDB */
 mongoose.connect( 'mongodb://localhost:27017/TallerWeb' , { useNewUrlParser: true }, (err, res)  => {
  if (err) {
    console.log(err)
    process.exit()
  }
  app.listen(5000, () => {
    console.log('Api cargada en el puerto: 5000...')
  })
})