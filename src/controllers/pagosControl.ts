import {Request, Response} from 'express';
import db from '../db';

class PagosControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM PagosCaja
                  WHERE idCaja = ? 
                  order by id desc`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`insert into PagosCaja(descripcion, idCaja, monto)
                         Values(?,?,?)`,
                         [data.descripcion, data.idCaja, data.monto = data.monto.replace(/,/g, '.')], (error, stock) => 
                         {
                            if (error) throw error;
                            
                             db.query(`UPDATE Cajas SET pagos = pagos + ? WHERE id = ?`,
                            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    

    public async Eliminar (req:Request, res:Response){
        const data = req.body;
        await db.query(`DELETE FROM pagosCaja WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.query(`UPDATE Cajas SET pagos = pagos - ? WHERE id = ?`,
            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };
}


const pagoControl = new PagosControl;
export default pagoControl;