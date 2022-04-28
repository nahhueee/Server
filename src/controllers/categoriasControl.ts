import {Request, Response} from 'express';
import db from '../db';

class CategoriasControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT * FROM categorias
                ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public Buscar (req:Request, res:Response){
        const Letra = (req.params.letra);
        db.query(`SELECT * FROM categorias WHERE categoria LIKE ('%${Letra}%') ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
         await db.query(`INSERT INTO categorias SET ?`,[data], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE categorias SET ? WHERE id = ?`,[data, req.params.id], (error, campos) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM categorias WHERE id = ?`,[req.params.id], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async ModificarPorcentajes (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE Stock SET porcentaje = ? 
                        WHERE idCategoria = ?`,[data.porcentaje, req.params.id], (error, campos) => {
           if (error) throw error;

           db.query(`UPDATE stock 
                    SET precio = costo + (costo*porcentaje/100)
                    WHERE idcategoria = ?`,
            [req.params.id], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
       });
    };

    public Categoriasproducto (req:Request, res:Response){
        db.query(`SELECT * FROM Stock 
                Where idCategoria = ?
                ORDER BY id desc`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

}


const catControl = new CategoriasControl;
export default catControl;