import {Request, Response} from 'express';
import db from '../db';

class MovimientosControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM MovimientosClientes
                  WHERE idCliente = ?  
                  order by id desc
                  Limit 30`, [req.params.id],(error, Campos) => {
                if (error) throw error;
                res.json(Campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`insert into MovimientosClientes(idCliente, movimiento, fecha, tipo)
                         Values(?,?,?,?)`,
                         [data.idCliente, data.movimiento, data.fecha, data.tipo], (error, campos) => 
                         {
                            if (error) throw error;
                            res.json('realizado Correctamente');
                         });
    };
}


const movControl = new MovimientosControl;
export default movControl;