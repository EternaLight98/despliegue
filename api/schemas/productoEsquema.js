const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const crearProductoEsquema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const actualizarProductoEsquema = Joi.object({
  name: name,
  price: price,
  image: image
});

const verProductoEsquema = Joi.object({
  id: id.required(),
});

module.exports = {crearProductoEsquema, actualizarProductoEsquema, verProductoEsquema}
