"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagosControl_1 = __importDefault(require("../controllers/pagosControl"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/', pagosControl_1.default.Agregar);
router.get('/:id', pagosControl_1.default.Consultar);
router.put('/:id', pagosControl_1.default.Eliminar);
exports.default = router;
