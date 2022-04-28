import {Request, Response} from 'express';
import db from '../db';

class EstadisticasControl{
    
    public Consultar (req:Request, res:Response){
                const data = req.body;
               db.query(`select fecha, totalAPagar, precioCosto, totalAPagar-precioCosto Ganancia From ventas
               where fecha BETWEEN ? and ?
               order by fecha asc`, [data.fechaInicio, data.fechaFin],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public ConsultarDetalle (req:Request, res:Response){
        const data = req.body;
       db.query(`Select dv.idProducto, dv.cantidad, dv.idUnidad, dv.total-dv.costo Ganancia, s.producto From DetalleVentas dv
       inner join Stock s on s.id = dv.idProducto
       where dv.fecha BETWEEN ? and ?`, [data.fechaInicio, data.fechaFin],(error, stock) => {
        if (error) throw error;
        res.json(stock);
    });
    };

    public ConsultarCajas (req:Request, res:Response){
        const data = req.body;
       db.query(`Select id from Cajas
        where fecha BETWEEN ? and ?`, [data.fechaInicio, data.fechaFin],(error, stock) => {
        if (error) throw error;
        res.json(stock);
    });
    };
}


const estadisticaControl = new EstadisticasControl;
export default estadisticaControl;