"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuariosControl_1 = __importDefault(require("../controllers/usuariosControl"));
const express_1 = require("express");
const router = express_1.Router();
router.put('/', usuariosControl_1.default.Ingresar);
router.get('/:usuario', usuariosControl_1.default.VerificarUsuario);
router.post('/', usuariosControl_1.default.Agregar);
router.put('/:id', usuariosControl_1.default.Modificar);
router.delete('/:id', usuariosControl_1.default.Eliminar);
router.get('/', usuariosControl_1.default.Consultar);
exports.default = router;
