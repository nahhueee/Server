import {Request, Response} from 'express';
import db from '../db';

class detVentasControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT dv.*, s.Producto, u.Unidad FROM DetalleVentas dv
                  inner join Stock s on s.id = dv.idProducto
                  inner join Unidades u on u.id = dv.idUnidad
                  WHERE dv.idVenta = ? 
                  ORDER BY dv.id desc`, [req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`insert into DetalleVentas(idVenta, idProducto, fecha, cantidad, precio, costo, total, idUnidad)
                         Values(?, ?, ?, ?, ?, ?, ?, ?)`,
         [data.idVenta, data.idProducto, data.fecha, data.cantidad = data.cantidad.replace(/,/g, '.'), data.precio= data.precio.replace(/,/g, '.'), 
          data.costo = data.costo.replace(/,/g, '.'), data.total = data.total.replace(/,/g, '.'), data.idUnidad], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`UPDATE DetalleVentas SET
                        fecha = ?
                        Where id = ?`,
         [data.fecha, data.id], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM Cajas WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public ConsultarProductosElegidosKg (req:Request, res:Response){
        const data = req.body;
        db.query(`Select sum(dv.cantidad) CantidadKg, s.producto ProductoKg from ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 2 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public ConsultarProductosElegidosUni (req:Request, res:Response){
        const data = req.body;
        db.query(`Select sum(dv.cantidad) CantidadUni, s.producto ProductoUni from ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 1 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public ConsultarDetVentasCaja (req:Request, res:Response){
        db.query(`SELECT idProducto, s.producto, sum(dv.cantidad)Cantidad, u.Unidad, sum(dv.costo)TotalCosto, sum(dv.total)TotalPrecio, (sum(dv.total)-sum(dv.costo))Ganancia  FROM Ventas v
        inner join detalleventas dv on dv.idVenta = v.id
        inner join stock s on s.id = dv.idproducto
        inner join unidades u on u.id = dv.idunidad
        where v.idCaja = ?
        group by idProducto
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };
    
}


const detVtaControl = new detVentasControl;
export default detVtaControl;