import {Request, Response} from 'express';
import { textChangeRangeIsUnchanged } from 'typescript';
import db from '../db';

class productoControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT s.*, u.Unidad, c.categoria, p.nombre Proveedor FROM Stock s
                  inner join Unidades u on s.idUnidad = u.id
                  inner join Categorias c on c.id = s.idCategoria
                  inner join Proveedores p on p.id = s.idProveedor
                  ORDER BY id desc`, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public Buscar (req:Request, res:Response){
        const Letra = (req.params.letra);
        db.query(`SELECT s.*, u.Unidad, c.categoria, p.nombre Proveedor FROM Stock s
                    inner join Unidades u on s.idUnidad = u.id
                    inner join Categorias c on c.id = s.idCategoria
                    inner join Proveedores p on p.id = s.idProveedor
                    WHERE producto LIKE ('%${Letra}%') or codigo LIKE ('%${Letra}%')
                    ORDER BY id desc`, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
            await db.query(`insert into Stock(codigo, producto, cantidad, idUnidad, precio, costo, rutaImagen, idCategoria, porcentaje, idProveedor,codigoProveedor,cantXPack, faltante, noRedondeado, mas21, costoBase)
                        Values(?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`,
                        [data.codigo, data.producto, data.cantidad = data.cantidad.replace(/,/g, '.'),data.idUnidad, data.precio= data.precio.replace(/,/g, '.') , 
                        data.costo = data.costo.replace(/,/g, '.'), data.rutaImagen, data.idCategoria, data.porcentaje, data.idProveedor, data.codigoProveedor, data.cantXPack, data.faltante, data.noRedondeado, data.mas21, data.costoBase], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
                  
        await db.query(`UPDATE Stock SET
                        codigo = ?,
                        producto = ?,
                        cantidad = REPLACE (?, ',', '.'),
                        idUnidad = ?,
                        precio = REPLACE (?, ',', '.'),
                        costo = REPLACE (?, ',', '.'),
                        porcentaje = REPLACE (?, ',', '.'),
                        rutaImagen = ?,
                        idCategoria = ?,
                        idProveedor = ?,
                        codigoProveedor = ?,
                        cantXPack = ?,
                        faltante = ?,
                        noRedondeado = ?,
                        mas21 = ?,
                        costoBase = ?
                        WHERE id = ?`,[data.codigo, data.producto, data.cantidad, data.idUnidad, data.precio, data.costo,
                             data.porcentaje, data.rutaImagen, data.idCategoria, data.idProveedor, data.codigoProveedor, data.cantXPack, data.faltante,data.noRedondeado, data.mas21, data.costoBase, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
          
       });
    };

    public async Eliminar (req:Request, res:Response){
        await db.query(`DELETE FROM Stock WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async AgregarCantidad (req:Request, res:Response){
        const data = req.body;
        
        await db.query(`UPDATE Stock SET
                        cantidad = REPLACE (?, ',', '.')
                        WHERE id = ?`,[data.cantidad, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    public async Descontar (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE Stock SET
                        cantidad = cantidad - ?
                        WHERE id = ?`,[data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    public async Revertir (req:Request, res:Response){
        const data = req.body;
        await db.query(`UPDATE Stock SET
                        cantidad = cantidad + ?
                        WHERE id = ?`,[data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
                            if (error) throw error;
                            
                            db.query(`DELETE FROM DetalleVentas WHERE id = ?`,
                            [data.id], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    public ConsultarProductosProveedor (req:Request, res:Response){
        db.query(`SELECT s.*, u.Unidad, c.categoria FROM Stock s
                  inner join Unidades u on s.idUnidad = u.id
                  inner join Categorias c on c.id = s.idCategoria
                  WHERE s.idProveedor = ?
                  ORDER BY id desc`,[req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };
   
    public ObtenerProVenta (req:Request, res:Response){
        db.query(`SELECT * FROM  DetalleVentas
                WHERE idProducto = ?`,[req.params.id] ,(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };
}


const proControl = new productoControl;
export default proControl;