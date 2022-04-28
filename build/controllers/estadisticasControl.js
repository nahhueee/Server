"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class EstadisticasControl {
    Consultar(req, res) {
        const data = req.body;
        db_1.default.query(`select fecha, totalAPagar, precioCosto, totalAPagar-precioCosto Ganancia From ventas
               where fecha BETWEEN ? and ?
               order by fecha asc`, [data.fechaInicio, data.fechaFin], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    ConsultarDetalle(req, res) {
        const data = req.body;
        db_1.default.query(`Select dv.idProducto, dv.cantidad, dv.idUnidad, dv.total-dv.costo Ganancia, s.producto From DetalleVentas dv
       inner join Stock s on s.id = dv.idProducto
       where dv.fecha BETWEEN ? and ?`, [data.fechaInicio, data.fechaFin], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    ConsultarCajas(req, res) {
        const data = req.body;
        db_1.default.query(`Select id from Cajas
        where fecha BETWEEN ? and ?`, [data.fechaInicio, data.fechaFin], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
}
const estadisticaControl = new EstadisticasControl;
exports.default = estadisticaControl;
