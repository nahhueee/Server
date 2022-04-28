"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class extraccionControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT * FROM Extracciones
                  WHERE idCaja = ? 
                  order by id desc`, [req.params.id], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`insert into Extracciones(descripcion, idCaja, monto)
                         Values(?,?,?)`, [data.descripcion, data.idCaja, data.monto = data.monto.replace(/,/g, '.')], (error, stock) => {
                if (error)
                    throw error;
                db_1.default.query(`UPDATE Cajas SET extracciones = extracciones + ? WHERE id = ?`, [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) => {
                    if (error)
                        throw error;
                    res.json('Realizado Correctamente');
                });
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`DELETE FROM Extracciones WHERE id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                db_1.default.query(`UPDATE Cajas SET extracciones = extracciones - ? WHERE id = ?`, [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) => {
                    if (error)
                        throw error;
                    res.json('Realizado Correctamente');
                });
            });
        });
    }
    ;
}
const extraControl = new extraccionControl;
exports.default = extraControl;
