import express from 'express';
import cors from 'cors';
import morgan from 'morgan'

import categoriaRuta from './routes/categorias';
import empleadoRuta from './routes/empleados';
import usuarioRuta from './routes/usuarios';
import cajaRuta from './routes/cajas';
import productoRuta from './routes/productos';
import ventaRuta from './routes/ventas';
import detVentaRuta from './routes/detVentas';
import pagoRuta from './routes/pagos';
import extraccionRuta from './routes/extraccion';
import movimientoRuta from './routes/movimientos';
import estadisticaRuta from './routes/estadisticas';
import proveedorRuta from './routes/proveedores';

const app = express();
app.use(morgan("dev"));

//setings
app.set('port', process.env.Port || 6000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('json spaces', 2);

//Starting the server
app.listen(app.get('port'), () => {
console.log('server on port ' + app.get('port'));
});

//Routes
app.use('/api/categories', categoriaRuta);
app.use('/api/employees', empleadoRuta);
app.use('/api/users', usuarioRuta);
app.use('/api/cash', cajaRuta);
app.use('/api/products', productoRuta);
app.use('/api/sales', ventaRuta);
app.use('/api/detsales', detVentaRuta);
app.use('/api/extraction', extraccionRuta);
app.use('/api/payments', pagoRuta);
app.use('/api/movements', movimientoRuta);
app.use('/api/statistics', estadisticaRuta);
app.use('/api/providers', proveedorRuta);