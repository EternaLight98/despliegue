const express = require('express');

const ProductoServicio = require('../api/services/productoService.js')
const validatorHandler = require('../api/middlewares/validatorHandler.js')
const {crearProductoEsquema, actualizarProductoEsquema, verProductoEsquema} = require('../api/schemas/productoEsquema.js')

const routerProductos = express.Router();
const service = new ProductoServicio();


routerProductos.get('/api/', async (req, res) =>  {
    const productos = await service.buscar();
    res.json(productos);
});

// funcion especifica
routerProductos.get('/api/productos/filtro', (req, res) => {
    res.send('El filtro')
})

/*TODA FUNCION ESPECIFICA VA PRIMERO QUE UNA DINAMICA YA QUE PUEDE OCURRIR UN CHOQUE
DE EMPOINTS*/

  // fincion dinamica
routerProductos.get('/api/:id',
  validatorHandler(verProductoEsquema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const producto = await service.buscarId(id);
        res.json(producto);
      } catch (error) {
        next(error);
      }
});


routerProductos.post('/api/',
  validatorHandler(crearProductoEsquema, 'body'),
    async (req, res) =>{
      const body = req.body;
      const nuevoProducto = await service.crear(body);
      res.status(201).json(nuevoProducto);
});


routerProductos.patch('/api/:id',
validatorHandler(verProductoEsquema, 'params'),
  validatorHandler(actualizarProductoEsquema, 'body'),
    async (req, res, next) =>{
      try {
        const { id } = req.params;
        const body = req.body;
        const producto = await service.editar(id, body);
        res.json(producto);
      } catch (error) {
        next(error);
      }
});


routerProductos.delete('/api/:id', async (req, res) =>{
  try {
    const { id } = req.params;
    const rta = await service.eliminar(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

module.exports = routerProductos;

