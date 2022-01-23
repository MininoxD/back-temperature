import express from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { createWeather, currentWeather, getAllWheater, getCurrentWeather } from './controllers/wheater';
import './database/conecction'
import { CurrentWeather, CustomRequest, Weather } from './interface';
/* port */
const port:number = 5000
/* server express */
const app = express()
app.use(express.json());
/* server socket io */
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.get('/wheaters', async(req, res) => {
    res.send(await getAllWheater())
})

app.post('/wheater', async(req:CustomRequest<Pick<Weather,'temperature' | 'humidity'>>, res) => {
    if(req.body){
        res.send(await createWeather(req.body))
    }
});

app.post('/current-wheater', async(req:CustomRequest<Omit<CurrentWeather,'_id' | 'createdAt' | 'updatedAt'>>, res) => {
    if(req.body){
        res.send(await currentWeather(req.body))
    } 
})

app.get('/current-wheater', async(req, res) => {
    res.send(await getCurrentWeather())
})
/* start socket server */
io.on("connection", (socket) => {
    console.log("a user connected socket io",socket.id);

    io.emit('server:current-wheater', "hello world")
    socket.on('client:current-wheater', (data:Omit<CurrentWeather,'_id' | 'createdAt' | 'updatedAt'>) => {
        console.log("Data",data);
        io.emit('server:current-wheater', data)
    })
});

io.on("error", (err) => {
    console.log(err);
})
  
/* express server */
httpServer.listen(port)
console.log(`server ready on port http://localhost:${port}`);