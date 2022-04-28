import {Request, Response} from 'express';
import db from '../db';

class ventasControl{
    public Consultar (req:Request, res:Response){
        db.query(`SELECT v.*, u.nombre Responsable, tp.tipoPago TipoDePago FROM Ventas v
                  inner join Usuarios u on u.id = v.idResponsable
                  inner join TiposPago tp on tp.id = v.idTipoPago
                  where idCaja = ?
                  order by v.id desc`,[req.params.id], (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public UltimaVenta (req:Request, res:Response){
        db.query(`SELECT id FROM Ventas
                  ORDER BY id desc
                  LIMIT 1 `, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    public async Agregar (req:Request, res:Response){
        const data = req.body;
        await db.query(`insert into Ventas(idCaja, fecha, hora, idResponsable, idTipoPago, pagaCon, cambio, totalVenta, Entrega, TotalAPagar, precioCosto, efectivo, resto)
                         Values(?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`,
        [data.idCaja, data.fecha, data.hora, data.idResponsable,data.idTipoPago, data.pagaCon= data.pagaCon.replace(/,/g, '.') , 
        data.cambio = data.cambio.replace(/,/g, '.'), data.totalVenta = data.totalVenta.replace(/,/g, '.'), data.Entrega = 0, 
        data.totalAPagar = data.totalVenta.replace(/,/g, '.'), data.precioCosto = data.precioCosto.replace(/,/g, '.'),
        data.efectivo = data.efectivo.replace(/,/g, '.'),data.resto = data.resto.replace(/,/g, '.')], (error, campos) => 
        
        {
            if (error) throw error;
            
             db.query(`UPDATE Cajas SET totalVentas = totalVentas + ? WHERE id = ?`,
            [data.totalAPagar = data.totalAPagar.replace(/,/g, '.'), data.idCaja], (error, campos) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };  

    public async Eliminar (req:Request, res:Response){
        const data = req.body;
        await db.query(`DELETE FROM Ventas WHERE id = ?`,[req.params.id], (error, campos) => {
            if (error) throw error;
            
            db.query(`UPDATE Cajas SET totalVentas = totalVentas - ? WHERE id = ?`,
            [data.total = data.total.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };

    public async VerificarCampoHora (req:Request, res:Response){
        await db.query(`SELECT mas21 FROM stock`,(error, campos) => {
             if (error) {
                 res.json('Error')
                 throw error
                 };
             res.json('Existe');
            });
     };
    public async InsertarCampomas21 (req:Request, res:Response){
        await db.query('ALTER table stock ADD COLUMN (mas21 int( 11 ) NOT NULL);',function(err,result){
            if(err){
                console.log("ERROR:"+err.message);
                res.json("error")
            }
            else{
                console.log("new column added");
                res.json("Realizado")
            }
        });
    };
    public async InsertarCampocostobase(req:Request, res:Response){
        await db.query('ALTER table stock ADD COLUMN (costobase decimal(10,2) NOT NULL);',function(err,result){
            if(err){
                console.log("ERROR:"+err.message);
                res.json("error")
            }
            else{
                console.log("new column added");
                res.json("Realizado")
            }
        });
    };
    public async ActualizarCostosBase(req:Request, res:Response){
        await db.query('UPDATE stock SET costobase = costo ;',function(err,result){
            if(err){
                console.log("ERROR:"+err.message);
                res.json("error")
            }
            else{
                console.log("new column added");
                res.json("Realizado")
            }
        });
    };

    public async Modificar (req:Request, res:Response){
        const data = req.body;
        
         await db.query(`UPDATE Ventas SET
                        fecha = ?
                        Where id = ?`,
         [data.fecha, data.id], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };
   
}


const vtaControl = new ventasControl;
export default vtaControl;