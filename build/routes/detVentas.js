"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detVentasControl_1 = __importDefault(require("../controllers/detVentasControl"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/', detVentasControl_1.default.Agregar);
router.put('/', detVentasControl_1.default.Modificar);
router.get('/:id', detVentasControl_1.default.Consultar);
router.get('/productskg/:id', detVentasControl_1.default.ConsultarProductosElegidosKg);
router.get('/productsuni/:id', detVentasControl_1.default.ConsultarProductosElegidosUni);
router.get('/detventacaja/:id', detVentasControl_1.default.ConsultarDetVentasCaja);
exports.default = router;
