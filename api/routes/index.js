const express = require('express');

const productosRouter = require('./productosRouter');
const usuariosRouter = require('./usuariosRouter');
const categoriasRouter = require('./categoriasRouter')



function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)

  router.use('/productos', productosRouter);
  router.use('/categorias',categoriasRouter);
  router.use('/usuarios', usuariosRouter);
}

module.exports = routerApi;

