const express = require('express');

const CategoriaServicio = require('../services/categoriaService.js')
const routerCategorias = express.Router();
const service = new CategoriaServicio;

routerCategorias.get('/', async (req, res) => {
  const categorias = await service.buscar();
  res.json(categorias);
});


routerCategorias.get('/:id', async (req, res) => {
  const { id } = req.params;
  const categoria = await service.buscarId(id);
  res.json(categoria)
})


routerCategorias.post('/', async (req, res) => {
  const  body  = req.body;
  const nuevaCategoria = await service.crear(body)
  res.json(nuevaCategoria);
});


routerCategorias.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const categoria = await service.editar(id, body);
  res.json(categoria);
})


routerCategorias.delete('/:id', (req, res) => {
  const { id } = req.params;
  const categoria =  service.eliminar(id);
  res.json(categoria);
})

module.exports = routerCategorias;
