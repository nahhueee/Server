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
class ventasControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT v.*, u.nombre Responsable, tp.tipoPago TipoDePago FROM Ventas v
                  inner join Usuarios u on u.id = v.idResponsable
                  inner join TiposPago tp on tp.id = v.idTipoPago
                  where idCaja = ?
                  order by v.id desc`, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    UltimaVenta(req, res) {
        db_1.default.query(`SELECT id FROM Ventas
                  ORDER BY id desc
                  LIMIT 1 `, (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`insert into Ventas(idCaja, fecha, hora, idResponsable, idTipoPago, pagaCon, cambio, totalVenta, Entrega, TotalAPagar, precioCosto, efectivo, resto)
                         Values(?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`, [data.idCaja, data.fecha, data.hora, data.idResponsable, data.idTipoPago, data.pagaCon = data.pagaCon.replace(/,/g, '.'),
                data.cambio = data.cambio.replace(/,/g, '.'), data.totalVenta = data.totalVenta.replace(/,/g, '.'), data.Entrega = 0,
                data.totalAPagar = data.totalVenta.replace(/,/g, '.'), data.precioCosto = data.precioCosto.replace(/,/g, '.'),
                data.efectivo = data.efectivo.replace(/,/g, '.'), data.resto = data.resto.replace(/,/g, '.')], (error, campos) => {
                if (error)
                    throw error;
                db_1.default.query(`UPDATE Cajas SET totalVentas = totalVentas + ? WHERE id = ?`, [data.totalAPagar = data.totalAPagar.replace(/,/g, '.'), data.idCaja], (error, campos) => {
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
            yield db_1.default.query(`DELETE FROM Ventas WHERE id = ?`, [req.params.id], (error, campos) => {
                if (error)
                    throw error;
                db_1.default.query(`UPDATE Cajas SET totalVentas = totalVentas - ? WHERE id = ?`, [data.total = data.total.replace(/,/g, '.'), data.idCaja], (error, stock) => {
                    if (error)
                        throw error;
                    res.json('Realizado Correctamente');
                });
            });
        });
    }
    ;
    VerificarCampoHora(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`SELECT mas21 FROM stock`, (error, campos) => {
                if (error) {
                    res.json('Error');
                    throw error;
                }
                ;
                res.json('Existe');
            });
        });
    }
    ;
    InsertarCampomas21(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('ALTER table stock ADD COLUMN (mas21 int( 11 ) NOT NULL);', function (err, result) {
                if (err) {
                    console.log("ERROR:" + err.message);
                    res.json("error");
                }
                else {
                    console.log("new column added");
                    res.json("Realizado");
                }
            });
        });
    }
    ;
    InsertarCampocostobase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('ALTER table stock ADD COLUMN (costobase decimal(10,2) NOT NULL);', function (err, result) {
                if (err) {
                    console.log("ERROR:" + err.message);
                    res.json("error");
                }
                else {
                    console.log("new column added");
                    res.json("Realizado");
                }
            });
        });
    }
    ;
    ActualizarCostosBase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('UPDATE stock SET costobase = costo ;', function (err, result) {
                if (err) {
                    console.log("ERROR:" + err.message);
                    res.json("error");
                }
                else {
                    console.log("new column added");
                    res.json("Realizado");
                }
            });
        });
    }
    ;
    Modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Ventas SET
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
const vtaControl = new ventasControl;
exports.default = vtaControl;
