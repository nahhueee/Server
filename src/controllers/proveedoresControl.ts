import {Request, Response} from 'express';
import db from '../db';

class ProveedorControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM Proveedores ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public Buscar (req:Request, res:Response){
        const Letra = (req.params.letra);
        db.query(`SELECT * FROM Proveedores WHERE nombre LIKE ('%${Letra}%') ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
         await db.query(`INSERT INTO Proveedores SET ?`,[data], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE Proveedores SET ? WHERE id = ?`,[data, req.params.id], (error, campos) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM Proveedores WHERE id = ?`,[req.params.id], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };
}


const proControl = new ProveedorControl;
export default proControl;