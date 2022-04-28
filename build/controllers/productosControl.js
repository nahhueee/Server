"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class productoControl {
    Consultar(req, res) {
        db_1.default.query(`SELECT s.*, u.Unidad, c.categoria, p.nombre Proveedor FROM Stock s
                  inner join Unidades u on s.idUnidad = u.id
                  inner join Categorias c on c.id = s.idCategoria
                  inner join Proveedores p on p.id = s.idProveedor
                  ORDER BY id desc`, (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Buscar(req, res) {
        const Letra = (req.params.letra);
        db_1.default.query(`SELECT s.*, u.Unidad, c.categoria, p.nombre Proveedor FROM Stock s
                    inner join Unidades u on s.idUnidad = u.id
                    inner join Categorias c on c.id = s.idCategoria
                    inner join Proveedores p on p.id = s.idProveedor
                    WHERE producto LIKE ('%${Letra}%') or codigo LIKE ('%${Letra}%')
                    ORDER BY id desc`, (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`insert into Stock(codigo, producto, cantidad, idUnidad, precio, costo, rutaImagen, idCategoria, porcentaje, idProveedor,codigoProveedor,cantXPack, faltante, noRedondeado, mas21, costoBase)
                        Values(?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`, [data.codigo, data.producto, data.cantidad = data.cantidad.replace(/,/g, '.'), data.idUnidad, data.precio = data.precio.replace(/,/g, '.'),
                data.costo = data.costo.replace(/,/g, '.'), data.rutaImagen, data.idCategoria, data.porcentaje, data.idProveedor, data.codigoProveedor, data.cantXPack, data.faltante, data.noRedondeado, data.mas21, data.costoBase], (error, stock) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Stock SET
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
                        WHERE id = ?`, [data.codigo, data.producto, data.cantidad, data.idUnidad, data.precio, data.costo,
                data.porcentaje, data.rutaImagen, data.idCategoria, data.idProveedor, data.codigoProveedor, data.cantXPack, data.faltante, data.noRedondeado, data.mas21, data.costoBase, req.params.id], (error, stock) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`DELETE FROM Stock WHERE id = ?`, [req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    AgregarCantidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Stock SET
                        cantidad = REPLACE (?, ',', '.')
                        WHERE id = ?`, [data.cantidad, req.params.id], (error, stock) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Descontar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Stock SET
                        cantidad = cantidad - ?
                        WHERE id = ?`, [data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Revertir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`UPDATE Stock SET
                        cantidad = cantidad + ?
                        WHERE id = ?`, [data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
                if (error)
                    throw error;
                db_1.default.query(`DELETE FROM DetalleVentas WHERE id = ?`, [data.id], (error, stock) => {
                    if (error)
                        throw error;
                    res.json('Realizado Correctamente');
                });
            });
        });
    }
    ;
    ConsultarProductosProveedor(req, res) {
        db_1.default.query(`SELECT s.*, u.Unidad, c.categoria FROM Stock s
                  inner join Unidades u on s.idUnidad = u.id
                  inner join Categorias c on c.id = s.idCategoria
                  WHERE s.idProveedor = ?
                  ORDER BY id desc`, [req.params.id], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
    ObtenerProVenta(req, res) {
        db_1.default.query(`SELECT * FROM  DetalleVentas
                WHERE idProducto = ?`, [req.params.id], (error, stock) => {
            if (error)
                throw error;
            res.json(stock);
        });
    }
    ;
}
const proControl = new productoControl;
exports.default = proControl;
