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
class detVentasControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT dv.*, s.Producto, u.Unidad FROM DetalleVentas dv
                  inner join Stock s on s.id = dv.idProducto
                  inner join Unidades u on u.id = dv.idUnidad
                  WHERE dv.idVenta = ? 
                  ORDER BY dv.id desc`, [req.params.id], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`insert into DetalleVentas(idVenta, idProducto, fecha, cantidad, precio, costo, total, idUnidad)
                         Values(?, ?, ?, ?, ?, ?, ?, ?)`, [data.idVenta, data.idProducto, data.fecha, data.cantidad = data.cantidad.replace(/,/g, '.'), data.precio = data.precio.replace(/,/g, '.'),
                data.costo = data.costo.replace(/,/g, '.'), data.total = data.total.replace(/,/g, '.'), data.idUnidad], (error, stock) => {
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
            yield db_1.default.query(`UPDATE DetalleVentas SET
                        fecha = ?
                        Where id = ?`, [data.fecha, data.id], (error, stock) => {
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
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    ConsultarProductosElegidosKg(req, res) {
        const data = req.body;
        db_1.default.query(`Select sum(dv.cantidad) CantidadKg, s.producto ProductoKg from ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 2 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    ConsultarProductosElegidosUni(req, res) {
        const data = req.body;
        db_1.default.query(`Select sum(dv.cantidad) CantidadUni, s.producto ProductoUni from ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 1 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    ConsultarDetVentasCaja(req, res) {
        db_1.default.query(`SELECT idProducto, s.producto, sum(dv.cantidad)Cantidad, u.Unidad, sum(dv.costo)TotalCosto, sum(dv.total)TotalPrecio, (sum(dv.total)-sum(dv.costo))Ganancia  FROM Ventas v
        inner join detalleventas dv on dv.idVenta = v.id
        inner join stock s on s.id = dv.idproducto
        inner join unidades u on u.id = dv.idunidad
        where v.idCaja = ?
        group by idProducto
        `, [req.params.id], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
}
const detVtaControl = new detVentasControl;
exports.default = detVtaControl;
