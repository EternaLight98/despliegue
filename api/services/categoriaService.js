const { faker } = require('@faker-js/faker');

class CategoriaServicio {
  constructor(){
    this.categorias = [];
}

buscar(){
    return new Promise((res, rej) =>{
      setTimeout(() =>{
        res(this.categorias)
      }, 2000)
    })
  }

  buscarId(id){
    return new Promise((res, rej) => {
      setTimeout(() =>{
        res(this.categorias.find(categoria => categoria.id === id))
      },1200);
    })
}

crear(data){
  return new Promise((res, rej) => {
    const nuevaCategoria = {
      id: faker.string.uuid(),
      ...data
    }
    this.categorias.push(nuevaCategoria);
    setTimeout(() => {
      res(nuevaCategoria);
    }, 2000);
  })
}

editar(id, cambios){
  return new Promise((res, rej) => {
    const index = this.categorias.findIndex(categoria => categoria.id === id)
    if (index === -1) {
        throw new Error('no se encontro el ID');
    }
    const categoria = this.categorias[index];
    this.categorias[index] = {
      ...categoria,
      ...cambios
    }
    setTimeout(() =>{
      res(this.categorias[index]);
    }, 1500);
  })
}

eliminar(id){
    const index = this.categorias.findIndex(categoria => categoria.id === id);
    if (index === -1) {
      throw new Error('No encontrado');
    } else {
      return this.categorias.splice(index, 1)
    }
  }
}


module.exports = CategoriaServicio;
