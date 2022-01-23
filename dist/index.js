"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const wheater_1 = require("./controllers/wheater");
require("./database/conecction");
/* port */
const port = 5000;
/* server express */
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/* server socket io */
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: {
        origin: ["http://localhost:3000", "https://frontend-temperature.vercel.app"],
        methods: ["GET", "POST"]
    } });
app.get('/wheaters', async (req, res) => {
    res.send(await (0, wheater_1.getAllWheater)());
});
app.post('/wheater', async (req, res) => {
    if (req.body) {
        res.send(await (0, wheater_1.createWeather)(req.body));
    }
});
app.post('/current-wheater', async (req, res) => {
    if (req.body) {
        res.send(await (0, wheater_1.currentWeather)(req.body));
    }
});
app.get('/current-wheater', async (req, res) => {
    res.send(await (0, wheater_1.getCurrentWeather)());
});
app.get('/last-wheater', async (req, res) => {
    const lastWeather = await (0, wheater_1.getLastWeather)();
    if (lastWeather) {
        const { createdAt } = lastWeather;
        console.log("Date create", createdAt);
        let horaA = new Date();
        console.log("Date now", horaA);
        var transcurso = horaA.getTime() - createdAt.getTime();
        console.log("Tiempo transcurrido", transcurso);
        if (transcurso > 1.8e+6) {
            console.log("ya paso media hora");
        }
        res.send(lastWeather);
    }
});
const saveCurentWeather = async (data) => {
    const lastWeather = await (0, wheater_1.getLastWeather)();
    if (lastWeather) {
        const { createdAt } = lastWeather;
        console.log("Date create", createdAt);
        let horaA = new Date();
        console.log("Date now", horaA);
        var transcurso = horaA.getTime() - createdAt.getTime();
        console.log("Tiempo transcurrido", transcurso);
        if (transcurso > /* 1.8e+6 */ 300000) {
            console.log("ya paso 5 minutos");
            const wheaterCurrent = await (0, wheater_1.createWeather)({ humidity: data.humidity, temperature: data.temperatureF });
        }
    }
    else {
        const wheaterCurrent = await (0, wheater_1.createWeather)({ humidity: data.humidity, temperature: data.temperatureF });
    }
};
/* start socket server */
io.on("connection", (socket) => {
    console.log("a user connected socket io", socket.id);
    /* Event consts */
    socket.on('client-a:current-wheater', async (data) => {
        /* console.log("Data",data); */
        io.emit('server:current-wheater', data);
        saveCurentWeather(data);
    });
    /* Ui Events */
    socket.on('client:click-switch-mode', () => {
        console.log("click switch mode");
        io.emit('server:send-switch-mode', { "status": "swtch" });
    });
    socket.on('client:click-switch-rele', () => {
        console.log("click switch rele");
        io.emit('server:send-switch-rele', { "status": "swtch" });
    });
    socket.on('client-a:current-status', (data) => {
        console.log("accion arduino", data);
        io.emit('server:current-staus', data);
    });
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
});
/* express server */
httpServer.listen(port);
console.log(`server ready on port http://localhost:${port}`);
