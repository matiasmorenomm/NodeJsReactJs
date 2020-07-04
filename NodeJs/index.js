'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.listen(5000, () => {
  console.log('Api cargada en el puerto: 5000....')
})