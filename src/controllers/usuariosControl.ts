import {Request, Response} from 'express';
import db from '../db';

class UsuarioControl{
    public Ingresar (req:Request, res:Response){
        const data = req.body;
        db.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ? and password =?`, [data.usuario, data.password],(error, users) => {
                if (error) throw error;
                res.json(users);
            });
    };

    public Consultar (req:Request, res:Response){
        const data = req.body;
        db.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  `,(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public VerificarUsuario (req:Request, res:Response){
        const data = req.body;
        db.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ?`, [req.params.usuario],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`insert into Usuarios(usuario,nombre,password, idcargo, mail) Values(?,?,?,?,?)`,
                    [data.usuario, data.nombre, data.password, data.idcargo, data.mail], (error, campos) => {
                    if (error) throw error;
                    res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`Update Usuarios SET 
                        usuario = ?, nombre = ?, password =?, idcargo=?, mail= ?
                        Where id = ?`,
                    [data.usuario, data.nombre, data.password, data.idcargo, data.mail,req.params.id] ,(error, campos) => {
                    if (error) throw error;
                    res.json('Realizado Correctamente');
        });
    };

    public async Eliminar (req:Request, res:Response){
        const data = req.body;
        await db.query(`DELETE FROM Usuarios WHERE id = ?`,[req.params.id], (error, users) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
           });
    };
}


const userControl = new UsuarioControl;
export default userControl;