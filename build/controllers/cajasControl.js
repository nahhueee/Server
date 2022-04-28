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
class cajasControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  ORDER BY c.id desc`, (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Buscar(req, res) {
        const Letra = (req.params.letra);
        db_1.default.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  WHERE c.id LIKE ('%${Letra}%') 
                  ORDER BY c.id desc`, (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    UltimaCaja(req, res) {
        db_1.default.query(`SELECT id FROM Cajas
                  ORDER BY id desc
                  LIMIT 1 `, (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`INSERT INTO Cajas(fecha, idResponsable, extracciones, pagos, inicial, totalVentas)
        Values(?, ?, ?, ?, ?, ?)`, [data.fecha, data.idResponsable, data.extracciones, data.pagos, data.inicial = data.inicial.replace(/,/g, '.'), data.totalVentas], (error, stock) => {
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
            yield db_1.default.query(`UPDATE Cajas SET
                        fecha = ?,
                        idResponsable = ?,
                        extracciones = REPLACE (?, ',', '.'),
                        pagos = REPLACE (?, ',', '.'),
                        inicial = REPLACE (?, ',', '.'),
                        totalVentas = REPLACE (?, ',', '.')
                        WHERE id = ?`, [data.fecha, data.idResponsable, data.extracciones,
                data.pagos, data.inicial, data.totalVentas, req.params.id], (error, stock) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`DELETE FROM Cajas WHERE id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                db_1.default.query(`DELETE FROM PagosCaja WHERE idCaja = ?`, [req.params.id], (error, stock) => {
                    if (error)
                        throw error;
                    db_1.default.query(`DELETE FROM Extracciones WHERE idCaja = ?`, [req.params.id], (error, stock) => {
                        if (error)
                            throw error;
                        res.json('Realizado Correctamente');
                    });
                });
            });
        });
    }
    ;
    Finalizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`UPDATE Cajas SET 
                        finalizada = 1
                        Where id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Revertir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`UPDATE Cajas SET 
                        finalizada = 0
                        Where id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    ConsultarTotales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`select count(v.id) CantVentas, sum(v.precioCosto) TotalCosto, c.extracciones, c.pagos, c.inicial, c.totalVentas from Cajas c
                INNER join Ventas v on v.idCaja = c.id
                where c.id = ?
                GROUP BY c.id`, [req.params.id], (error, campos) => {
                if (error)
                    throw error;
                res.json(campos);
            });
        });
    }
    ;
    ConsultarComparativa(req, res) {
        db_1.default.query(`select fecha FechaComparativa, totalVentas TotalComparativo from cajas
         Where fecha BETWEEN YEAR(NOW()) and (SELECT fecha FROM Cajas Where Id = ?)
         order by fecha desc
         limit 6`, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    ConsultarDetalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`SELECT c.id idCaja, c.fecha, u.nombre, c.extracciones, c.pagos, c.inicial, c.totalVentas, v.id idVenta, v.totalAPagar, v.pagaCon, v.cambio, tp.tipoPago, v.efectivo, v.resto From Cajas c
                inner join Usuarios u on u.id = c.idResponsable
                INNER JOIN Ventas v on v.idCaja = c.id
                INNER join TiposPago tp on tp.id = v.idTipoPago
                where c.id = ?`, [req.params.id], (error, campos) => {
                if (error)
                    throw error;
                res.json(campos);
            });
        });
    }
    ;
    ModificarFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Cajas SET
                        fecha = ?
                        Where id = ?`, [data.fecha, data.id], (error, stock) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
}
const cjaControl = new cajasControl;
exports.default = cjaControl;
