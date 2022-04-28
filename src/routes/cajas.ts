import cajasControl  from '../controllers/cajasControl';
import { Router } from 'express';
const router : Router = Router();

router.put('/date', cajasControl.ModificarFecha);
router.get('/', cajasControl.Consultar);
router.get('/search/:letra', cajasControl.Buscar);
router.get('/lastid', cajasControl.UltimaCaja);
router.post('/', cajasControl.Agregar);
router.put('/:id', cajasControl.Modificar);
router.delete('/:id', cajasControl.Eliminar);

router.put('/close/:id', cajasControl.Finalizar);
router.put('/open/:id', cajasControl.Revertir);
router.get('/totals/:id', cajasControl.ConsultarTotales);
router.get('/comparative/:id', cajasControl.ConsultarComparativa);
router.get('/details/:id', cajasControl.ConsultarDetalles);



 export default router;