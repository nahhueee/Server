import movimientoControl  from '../controllers/movimientosControl';
import { Router } from 'express';
const router : Router = Router();

router.post('/', movimientoControl.Agregar);
router.get('/:id', movimientoControl.Consultar);

 export default router;