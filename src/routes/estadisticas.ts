import estadisticaControl  from '../controllers/estadisticasControl';
import { Router } from 'express';
const router : Router = Router();

router.put('/', estadisticaControl.Consultar);
router.put('/details/', estadisticaControl.ConsultarDetalle);
router.put('/cash/', estadisticaControl.ConsultarCajas);
 export default router;