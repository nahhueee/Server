import {Request, Response} from 'express';
import db from '../db';

class EmpleadoControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM Usuarios WHERE idCargo = 2 ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public Buscar (req:Request, res:Response){
        const Letra = (req.params.letra);
        db.query(`SELECT * FROM Usuarios WHERE nombre LIKE ('%${Letra}%') and idCargo = 2 ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
         await db.query(`INSERT INTO Empleados SET ?`,[data], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE Empleados SET ? WHERE id = ?`,[data, req.params.id], (error, campos) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM Empleados WHERE id = ?`,[req.params.id], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public ObtenerEmpleadoCaja (req:Request, res:Response){
        db.query(`SELECT * FROM  Cajas
                WHERE idResponsable = ?`,[req.params.id] ,(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };
}


const empControl = new EmpleadoControl;
export default empControl;