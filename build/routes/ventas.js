"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VentasControl_1 = __importDefault(require("../controllers/VentasControl"));
const express_1 = require("express");
const router = express_1.Router();
router.put('/date', VentasControl_1.default.Modificar);
router.get('/lastid/', VentasControl_1.default.UltimaVenta);
router.get('/gethora', VentasControl_1.default.VerificarCampoHora);
router.get('/:id', VentasControl_1.default.Consultar);
router.post('/inserthora', VentasControl_1.default.InsertarCampomas21);
router.post('/insertcostobase', VentasControl_1.default.InsertarCampocostobase);
router.post('/update', VentasControl_1.default.ActualizarCostosBase);
router.post('/', VentasControl_1.default.Agregar);
router.delete('/:id', VentasControl_1.default.Eliminar);
exports.default = router;
