import categoriaControl  from '../controllers/categoriasControl';
import { Router } from 'express';
const router : Router = Router();

router.get('/', categoriaControl.Consultar);
router.get('/search/:letra', categoriaControl.Buscar);
router.post('/', categoriaControl.Agregar);
router.put('/:id', categoriaControl.Modificar);
router.delete('/:id', categoriaControl.Eliminar);
router.put('/percentage/:id', categoriaControl.ModificarPorcentajes);

router.get('/stock/:id', categoriaControl.Categoriasproducto);
 export default router;