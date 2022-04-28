import EmpleadoControl  from '../controllers/empleadosControl';
import { Router } from 'express';
const router : Router = Router();

router.get('/', EmpleadoControl.Consultar);
router.get('/search/:letra', EmpleadoControl.Buscar);
router.post('/', EmpleadoControl.Agregar);
router.put('/:id', EmpleadoControl.Modificar);
router.delete('/:id', EmpleadoControl.Eliminar);
router.get('/:id', EmpleadoControl.ObtenerEmpleadoCaja);

 export default router;