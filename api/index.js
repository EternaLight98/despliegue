const express = require('express');
const cors = require('cors')
const routerApi = require('../routes')

const {logErrores, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const whitelist = ['http://localhost:80'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin){
      callback(null, true);
    }else {
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta')
})

routerApi(app);

app.use(logErrores);
app.use(boomErrorHandler);
app.use(errorHandler);


// servidor escuchando
app.listen(port, () => {
  console.log('Mi port ' + port);
});






/*
app.get('/categoria/:categoriaId/productos/:productoId', (req, res) => {
  const { categoriaId, productoId } = req.params;
  res.json({
    categoriaId,
    productoId,
  }
  );
});
*/
