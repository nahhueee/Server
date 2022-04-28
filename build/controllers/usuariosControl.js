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
class UsuarioControl {
    Ingresar(req, res) {
        const data = req.body;
        db_1.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ? and password =?`, [data.usuario, data.password], (error, users) => {
            if (error)
                throw error;
            res.json(users);
        });
    }
    ;
    Consultar(req, res) {
        const data = req.body;
        db_1.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  `, (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    VerificarUsuario(req, res) {
        const data = req.body;
        db_1.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ?`, [req.params.usuario], (error, campos) => {
            if (error)
                throw error;
            res.json(campos);
        });
    }
    ;
    Agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`insert into Usuarios(usuario,nombre,password, idcargo, mail) Values(?,?,?,?,?)`, [data.usuario, data.nombre, data.password, data.idcargo, data.mail], (error, campos) => {
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
            yield db_1.default.query(`Update Usuarios SET 
                        usuario = ?, nombre = ?, password =?, idcargo=?, mail= ?
                        Where id = ?`, [data.usuario, data.nombre, data.password, data.idcargo, data.mail, req.params.id], (error, campos) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield db_1.default.query(`DELETE FROM Usuarios WHERE id = ?`, [req.params.id], (error, users) => {
                if (error)
                    throw error;
                res.json('Realizado Correctamente');
            });
        });
    }
    ;
}
const userControl = new UsuarioControl;
exports.default = userControl;
