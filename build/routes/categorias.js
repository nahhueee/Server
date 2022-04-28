"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriasControl_1 = __importDefault(require("../controllers/categoriasControl"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/', categoriasControl_1.default.Consultar);
router.get('/search/:letra', categoriasControl_1.default.Buscar);
router.post('/', categoriasControl_1.default.Agregar);
router.put('/:id', categoriasControl_1.default.Modificar);
router.delete('/:id', categoriasControl_1.default.Eliminar);
router.put('/percentage/:id', categoriasControl_1.default.ModificarPorcentajes);
router.get('/stock/:id', categoriasControl_1.default.Categoriasproducto);
exports.default = router;
