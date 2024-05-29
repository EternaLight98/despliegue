const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class UsuarioServicio {
  constructor(){
    this.usuarios = [];
  }

  crear(data){
    const nuevoUsuario = {
      id: faker.string.uuid(),
      ...data
    }
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  buscar(){
    return this.usuarios;
  }

  buscarId(id){
    const usuario = this.usuarios.find(usuario => usuario.id === id);
    if (!usuario) {
      throw boom.notFound('usuario no encontrado');
    }
    if (usuario.isBlock) {
      throw boom.conflict('usuario bloqueado');
    }
    return usuario
  }

  editar(id, cambios){
    const index = this.usuarios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const usuario = this.usuarios[index];
    this.usuarios[index] = {
      ...usuario,
      ...cambios
    }
    return this.usuarios[index];
  }

  eliminar(id){
    const index = this.usuarios.findIndex(usuario => usuario.id === id);
    if (index === -1) {
      throw new Error('No eliminado')
    } else {
      return this.usuarios.splice(index, 1);
    }
  }
}

module.exports = UsuarioServicio;
