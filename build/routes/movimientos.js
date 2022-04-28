"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movimientosControl_1 = __importDefault(require("../controllers/movimientosControl"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/', movimientosControl_1.default.Agregar);
router.get('/:id', movimientosControl_1.default.Consultar);
exports.default = router;
