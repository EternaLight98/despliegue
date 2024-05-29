const express = require('express');

const UsuarioServicio = require('../services/usuarioService.js')
const routerUsuarios = express.Router();
const service = new UsuarioServicio();


routerUsuarios.get('/', (req, res) =>{
  const usuarios = service.buscar();
  res.json(usuarios);
});


routerUsuarios.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = service.buscarId(id);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
})


routerUsuarios.post('/',(req, res) => {
  const body = req.body;
  const nuevoUsuario = service.crear(body);
  res.json(nuevoUsuario);
});


routerUsuarios.patch('/:id', (req, res, next) =>{
  try {
    const { id } = req.params;
    const body = req.body;
    const usuario = service.editar(id, body);
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})


routerUsuarios.delete('/:id', (req, res) => {
  const{ id } = req.params;
  const eliminar = service.eliminar(id);
  res.json(eliminar);
})


module.exports = routerUsuarios;
