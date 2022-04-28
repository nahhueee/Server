import ventasControl  from '../controllers/VentasControl';
import { Router } from 'express';
const router : Router = Router();


router.put('/date', ventasControl.Modificar);
router.get('/lastid/', ventasControl.UltimaVenta);
router.get('/gethora', ventasControl.VerificarCampoHora);
router.get('/:id', ventasControl.Consultar);
router.post('/inserthora', ventasControl.InsertarCampomas21);
router.post('/insertcostobase', ventasControl.InsertarCampocostobase);
router.post('/update', ventasControl.ActualizarCostosBase);
router.post('/', ventasControl.Agregar);
router.delete('/:id', ventasControl.Eliminar);

 export default router;