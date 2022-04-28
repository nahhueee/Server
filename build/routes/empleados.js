"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empleadosControl_1 = __importDefault(require("../controllers/empleadosControl"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/', empleadosControl_1.default.Consultar);
router.get('/search/:letra', empleadosControl_1.default.Buscar);
router.post('/', empleadosControl_1.default.Agregar);
router.put('/:id', empleadosControl_1.default.Modificar);
router.delete('/:id', empleadosControl_1.default.Eliminar);
router.get('/:id', empleadosControl_1.default.ObtenerEmpleadoCaja);
exports.default = router;
