import productoControl  from '../controllers/productosControl';
import { Router } from 'express';
const router : Router = Router();

router.get('/', productoControl.Consultar);
router.get('/search/:letra', productoControl.Buscar);
router.post('/', productoControl.Agregar);
router.put('/:id', productoControl.Modificar);
router.delete('/:id', productoControl.Eliminar);
router.put('/add/:id', productoControl.AgregarCantidad);
router.put('/discount/:id', productoControl.Descontar);
router.put('/reverse/:id', productoControl.Revertir);
router.get('/:id', productoControl.ObtenerProVenta);
router.get('/provider/:id', productoControl.ConsultarProductosProveedor);

 export default router;