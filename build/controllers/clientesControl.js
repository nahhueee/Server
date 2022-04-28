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
class ClientesControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT * FROM Clientes ORDER BY id desc`, (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    Buscar(req, res) {
        const Letra = (req.params.letra);
        db_1.default.query(`SELECT * FROM Clientes WHERE nombre LIKE ('%${Letra}%') ORDER BY id desc`, (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`INSERT INTO Clientes SET ?`, [data], (error, campos) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Clientes SET ? WHERE id = ?`, [data, req.params.id], (error, campos) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`DELETE FROM Clientes WHERE id = ?`, [req.params.id], (error, campos) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    VentasCliente(req, res) {
        db_1.default.query(`SELECT v.*, e.nombre Responsable FROM Ventas v
                inner join empleados e on e.id = v.idResponsable
                Where idCliente = ?
                ORDER BY id desc`, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
}
const cliControl = new ClientesControl;
exports.default = cliControl;
