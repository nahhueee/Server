"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const categorias_1 = __importDefault(require("./routes/categorias"));
const empleados_1 = __importDefault(require("./routes/empleados"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const cajas_1 = __importDefault(require("./routes/cajas"));
const productos_1 = __importDefault(require("./routes/productos"));
const ventas_1 = __importDefault(require("./routes/ventas"));
const detVentas_1 = __importDefault(require("./routes/detVentas"));
const pagos_1 = __importDefault(require("./routes/pagos"));
const extraccion_1 = __importDefault(require("./routes/extraccion"));
const movimientos_1 = __importDefault(require("./routes/movimientos"));
const estadisticas_1 = __importDefault(require("./routes/estadisticas"));
const proveedores_1 = __importDefault(require("./routes/proveedores"));
const app = express_1.default();
app.use(morgan_1.default("dev"));
//setings
app.set('port', process.env.Port || 6000);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set('json spaces', 2);
//Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});
//Routes
app.use('/api/categories', categorias_1.default);
app.use('/api/employees', empleados_1.default);
app.use('/api/users', usuarios_1.default);
app.use('/api/cash', cajas_1.default);
app.use('/api/products', productos_1.default);
app.use('/api/sales', ventas_1.default);
app.use('/api/detsales', detVentas_1.default);
app.use('/api/extraction', extraccion_1.default);
app.use('/api/payments', pagos_1.default);
app.use('/api/movements', movimientos_1.default);
app.use('/api/statistics', estadisticas_1.default);
app.use('/api/providers', proveedores_1.default);
