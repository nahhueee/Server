import detVentasControl  from '../controllers/detVentasControl';
import { Router } from 'express';
const router : Router = Router();

router.post('/', detVentasControl.Agregar);
router.put('/', detVentasControl.Modificar);
router.get('/:id', detVentasControl.Consultar);
router.get('/productskg/:id', detVentasControl.ConsultarProductosElegidosKg);
router.get('/productsuni/:id', detVentasControl.ConsultarProductosElegidosUni);
router.get('/detventacaja/:id', detVentasControl.ConsultarDetVentasCaja);

 export default router;