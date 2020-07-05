'use strict'

var Libro = require('../models/libro')

function guardar(req, res) {
  let libro = new Libro()

  libro.nombre = req.body.nombre
  if(libro.nombre == null){
    throw new Error('El nombre no fue declarado');
  }
  libro.autor = req.body.autor
  if(libro.autor == null){
    throw new Error('El autor no fue declarado');
  }
  libro.ano = req.body.ano
  if(libro.ano == null){
    throw new Error('El año no fue declarado');
  }
  libro.idioma = req.body.idioma
  if(libro.idioma == null){
    throw new Error('El idioma no fue declarado');
  }

  libro.save((err, libroStore) => {
    if (err) res.status(500).send(`Error base de datos ${ err }`)
    res.status(200).send({
      libro: libroStore
    })
  })
}

function libros(req, res) {
  Libro.find().exec((err, libros) => {
    if (err || !libros) res.status(400).send(`no hay libros`)

    res.status(200).send({
      libros
    })
  })
}

function busqueda(req, res) {
  let anoB = req.params.ano
  let idiomaB = req.params.idioma

  Libro.find({ano: anoB, idioma: idiomaB}).exec((err, libros) => {
    if (err || !libros) res.status(400).send(`no hay libros`)

    res.status(200).send({
      libros
    })
  })
}

function libro(req, res) {
  let id = req.params.id

  Libro.findById(id).exec((err, libro) => {
    if (err || !libro) res.status(400).send(`No existe el libro`)

    res.status(200).send({
      libro
    })
  })
}

function actualizar(req, res) {
  let id = req.params.id

  var actualizar = {
    nombre: req.body.nombre,
    autor: req.body.autor,
    ano: req.body.ano,
    idioma: req.body.idioma
  }

  Libro.findOneAndUpdate({_id: id}, actualizar, {new:true}, (err, LibroUpdated) => {
    if(err) res.status(400).send(`No se pudo actualizar`)
    res.status(200).send({libro: LibroUpdated})
  });
}

function eliminar(req, res){
 let id = req.params.id

 Libro.findByIdAndDelete({_id: id}, (err, LibroDeleted) => {
  if(err) res.status(400).send(`No se pudo eliminar`)
  res.status(200).send({respuesta: LibroDeleted})
 })
}

module.exports = {
  guardar,
  libros,
  libro,
  actualizar,
  eliminar,
  busqueda
}