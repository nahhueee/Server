"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productosControl_1 = __importDefault(require("../controllers/productosControl"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/', productosControl_1.default.Consultar);
router.get('/search/:letra', productosControl_1.default.Buscar);
router.post('/', productosControl_1.default.Agregar);
router.put('/:id', productosControl_1.default.Modificar);
router.delete('/:id', productosControl_1.default.Eliminar);
router.put('/add/:id', productosControl_1.default.AgregarCantidad);
router.put('/discount/:id', productosControl_1.default.Descontar);
router.put('/reverse/:id', productosControl_1.default.Revertir);
router.get('/:id', productosControl_1.default.ObtenerProVenta);
router.get('/provider/:id', productosControl_1.default.ConsultarProductosProveedor);
exports.default = router;
