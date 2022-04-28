import userControl  from '../controllers/usuariosControl';
import { Router } from 'express';
const router : Router = Router();

router.put('/', userControl.Ingresar);
router.get('/:usuario', userControl.VerificarUsuario);
router.post('/', userControl.Agregar);
router.put('/:id', userControl.Modificar);
router.delete('/:id', userControl.Eliminar);
router.get('/', userControl.Consultar);

 export default router;