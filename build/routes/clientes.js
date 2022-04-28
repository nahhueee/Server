"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientesControl_1 = __importDefault(require("../controllers/clientesControl"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/', clientesControl_1.default.Consultar);
router.get('/search/:letra', clientesControl_1.default.Buscar);
router.post('/', clientesControl_1.default.Agregar);
router.put('/:id', clientesControl_1.default.Modificar);
router.delete('/:id', clientesControl_1.default.Eliminar);
router.get('/register/:id', clientesControl_1.default.VentasCliente);
exports.default = router;
