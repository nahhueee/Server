"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envasesCliente_1 = __importDefault(require("../controllers/envasesCliente"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/:id', envasesCliente_1.default.Consultar);
router.post('/', envasesCliente_1.default.Agregar);
router.delete('/:id', envasesCliente_1.default.Eliminar);
exports.default = router;
