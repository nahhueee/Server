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
class EnvasesControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT ec.id, ec.idCliente,ec.idProducto, ec.fecha,s.Producto, ec.cantidad Cant FROM EnvasesCliente ec
                    inner join stock s on s.id = ec.idProducto
                    WHERE ec.idcliente = ?
                    ORDER BY ec.id desc`, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`INSERT INTO EnvasesCliente SET ?`, [data], (error, campos) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`DELETE FROM EnvasesCliente WHERE id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
}
const envControl = new EnvasesControl;
exports.default = envControl;
