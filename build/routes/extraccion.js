"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extraccionControl_1 = __importDefault(require("../controllers/extraccionControl"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/', extraccionControl_1.default.Agregar);
router.get('/:id', extraccionControl_1.default.Consultar);
router.delete('/:id', extraccionControl_1.default.Eliminar);
exports.default = router;
