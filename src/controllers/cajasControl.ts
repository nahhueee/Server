import {Request, Response} from 'express';
import db from '../db';

class cajasControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  ORDER BY c.id desc`, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public Buscar (req:Request, res:Response){
        const Letra = (req.params.letra);
        db.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  WHERE c.id LIKE ('%${Letra}%') 
                  ORDER BY c.id desc`, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public UltimaCaja (req:Request, res:Response){
        db.query(`SELECT id FROM Cajas
                  ORDER BY id desc
                  LIMIT 1 `, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        await db.query(`INSERT INTO Cajas(fecha, idResponsable, extracciones, pagos, inicial, totalVentas)
        Values(?, ?, ?, ?, ?, ?)`,
        [data.fecha, data.idResponsable, data.extracciones, data.pagos, data.inicial= data.inicial.replace(/,/g, '.'), data.totalVentas], (error, stock) => {
        if (error) throw error;
        res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        
        await db.query(`UPDATE Cajas SET
                        fecha = ?,
                        idResponsable = ?,
                        extracciones = REPLACE (?, ',', '.'),
                        pagos = REPLACE (?, ',', '.'),
                        inicial = REPLACE (?, ',', '.'),
                        totalVentas = REPLACE (?, ',', '.')
                        WHERE id = ?`,[data.fecha, data.idResponsable, data.extracciones, 
                                       data.pagos,data.inicial, data.totalVentas, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM Cajas WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.query(`DELETE FROM PagosCaja WHERE idCaja = ?`,
            [req.params.id], (error, stock) =>{
                if (error) throw error;
                
                db.query(`DELETE FROM Extracciones WHERE idCaja = ?`,
                [req.params.id], (error, stock) =>{
                    if (error) throw error;
                    res.json('Realizado Correctamente');
                })
            });
        });
    };

    public async Finalizar (req:Request, res:Response){
        await db.query(`UPDATE Cajas SET 
                        finalizada = 1
                        Where id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Revertir (req:Request, res:Response){
        await db.query(`UPDATE Cajas SET 
                        finalizada = 0
                        Where id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async ConsultarTotales (req:Request, res:Response){

        await db.query(`select count(v.id) CantVentas, sum(v.precioCosto) TotalCosto, c.extracciones, c.pagos, c.inicial, c.totalVentas from Cajas c
                INNER join Ventas v on v.idCaja = c.id
                where c.id = ?
                GROUP BY c.id`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public ConsultarComparativa (req:Request, res:Response){
        db.query(`select fecha FechaComparativa, totalVentas TotalComparativo from cajas
         Where fecha BETWEEN YEAR(NOW()) and (SELECT fecha FROM Cajas Where Id = ?)
         order by fecha desc
         limit 6`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async ConsultarDetalles (req:Request, res:Response){

        await db.query(`SELECT c.id idCaja, c.fecha, u.nombre, c.extracciones, c.pagos, c.inicial, c.totalVentas, v.id idVenta, v.totalAPagar, v.pagaCon, v.cambio, tp.tipoPago, v.efectivo, v.resto From Cajas c
                inner join Usuarios u on u.id = c.idResponsable
                INNER JOIN Ventas v on v.idCaja = c.id
                INNER join TiposPago tp on tp.id = v.idTipoPago
                where c.id = ?`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async ModificarFecha (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`UPDATE Cajas SET
                        fecha = ?
                        Where id = ?`,
         [data.fecha, data.id], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };
}


const cjaControl = new cajasControl;
export default cjaControl;