const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductoServicio {

  constructor(){
    this.productos = [];
    this.generate();
  }

  generate(){
    const limite = 100;
    for (let index = 0; index < limite; index++) {
      this.productos.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

async crear(data){
    const nuevoProducto = {
      id: faker.string.uuid(),
      ...data
    }
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

buscar(){
    return new Promise((res, rej ) =>{
      setTimeout(() =>{
        res(this.productos);
      }, 2000);
    })
  }

buscarId(id){
  return new Promise((res, rej) => {
    const producto = this.productos.find(item => item.id === id);
    if (!producto) {
      throw boom.notFound('Producto no encontrado');
    }
    if (producto.isBlock) {
      throw boom.conflict('Producto Esta bloqueado');
    }
    setTimeout(() =>{
      res(producto);
    }, 2000)
  })
}

async editar(id, cambios){
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const producto = this.productos[index];
    this.productos[index] = {
      ...producto,
      ...cambios
    }
    return this.productos[index];
  }

async eliminar(id){
  return new Promise((res, rej) => {
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    } else {
      setTimeout(()=>{
        res(this.productos.splice(index, 1));
      }, 2000);
    }
  })
  }
}


module.exports = ProductoServicio;
