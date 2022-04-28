import ProveedorControl  from '../controllers/proveedoresControl';
import { Router } from 'express';
const router : Router = Router();

router.get('/', ProveedorControl.Consultar);
router.get('/search/:letra', ProveedorControl.Buscar);
router.post('/', ProveedorControl.Agregar);
router.put('/:id', ProveedorControl.Modificar);
router.delete('/:id', ProveedorControl.Eliminar);


 export default router;