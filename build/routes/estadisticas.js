"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadisticasControl_1 = __importDefault(require("../controllers/estadisticasControl"));
const express_1 = require("express");
const router = express_1.Router();
router.put('/', estadisticasControl_1.default.Consultar);
router.put('/details/', estadisticasControl_1.default.ConsultarDetalle);
router.put('/cash/', estadisticasControl_1.default.ConsultarCajas);
exports.default = router;
