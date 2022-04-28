import pagosControl  from '../controllers/pagosControl';
import { Router } from 'express';
const router : Router = Router();

router.post('/', pagosControl.Agregar);
router.get('/:id', pagosControl.Consultar);
router.put('/:id', pagosControl.Eliminar);

 export default router;