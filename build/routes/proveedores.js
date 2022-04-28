"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proveedoresControl_1 = __importDefault(require("../controllers/proveedoresControl"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/', proveedoresControl_1.default.Consultar);
router.get('/search/:letra', proveedoresControl_1.default.Buscar);
router.post('/', proveedoresControl_1.default.Agregar);
router.put('/:id', proveedoresControl_1.default.Modificar);
router.delete('/:id', proveedoresControl_1.default.Eliminar);
exports.default = router;
