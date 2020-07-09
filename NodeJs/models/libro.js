const mongoose = require('mongoose')
const Schema = mongoose.Schema
const libroSchema = Schema({
    nombre: String,
    autor: String,
    ano: Number,
    idioma: {type: String, enum:['espanol', 'ingles']}
  })

module.exports = mongoose.model('libros', libroSchema)