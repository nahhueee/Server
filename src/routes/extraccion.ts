import extraccionControl  from '../controllers/extraccionControl';
import { Router } from 'express';
const router : Router = Router();

router.post('/', extraccionControl.Agregar);
router.get('/:id', extraccionControl.Consultar);
router.delete('/:id', extraccionControl.Eliminar);

 export default router;