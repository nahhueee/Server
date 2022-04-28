import {Request, Response} from 'express';
import db from '../db';

class extraccionControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM Extracciones
                  WHERE idCaja = ? 
                  order by id desc`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`insert into Extracciones(descripcion, idCaja, monto)
                         Values(?,?,?)`,
                         [data.descripcion,data.idCaja,data.monto = data.monto.replace(/,/g, '.')], (error, stock) => 
                         {
                            if (error) throw error;
                            
                             db.query(`UPDATE Cajas SET extracciones = extracciones + ? WHERE id = ?`,
                            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    public async Eliminar (req:Request, res:Response){
        const data = req.body;
        await db.query(`DELETE FROM Extracciones WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.query(`UPDATE Cajas SET extracciones = extracciones - ? WHERE id = ?`,
            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };
}


const extraControl = new extraccionControl;
export default extraControl;