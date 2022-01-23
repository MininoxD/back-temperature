import express from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { createWeather, currentWeather, getAllWheater, getCurrentWeather, getLastWeather } from './controllers/wheater';
import './database/conecction'
import { CurrentWeather, CurrentWeatherIot, CustomRequest, Weather } from './interface';
/* port */
const port:number = 5000
/* server express */
const app = express()
app.use(express.json());
/* server socket io */
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: ["http://localhost:3000","https://frontend-temperature.vercel.app"],
    methods: ["GET", "POST"]
}});

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

app.get('/last-wheater', async(req, res) => {
    const lastWeather = await getLastWeather()
    if(lastWeather){
        const {createdAt} = lastWeather
        console.log("Date create",createdAt)
        let horaA = new Date();
        console.log("Date now", horaA);
        var transcurso =  horaA.getTime()- createdAt.getTime() ;
        console.log("Tiempo transcurrido", transcurso);
        if( transcurso > 1.8e+6){
         console.log("ya paso media hora");
        }
        
        res.send(lastWeather)
    }
})

const saveCurentWeather = async(data: Pick<CurrentWeather,'humidity' | 'temperatureF'>)=>{
    const lastWeather = await getLastWeather()
        if(lastWeather){
            const {createdAt} = lastWeather
            console.log("Date create",createdAt)
            let horaA = new Date();
            console.log("Date now", horaA);
            var transcurso =  horaA.getTime()- createdAt.getTime() ;
            console.log("Tiempo transcurrido", transcurso);
            if( transcurso > /* 1.8e+6 */300000){
                console.log("ya paso 5 minutos");
                const wheaterCurrent = await createWeather({humidity: data.humidity, temperature: data.temperatureF})
            }
        }else{
            const wheaterCurrent = await createWeather({humidity: data.humidity, temperature: data.temperatureF})
        }
}
/* start socket server */
io.on("connection", (socket) => {
    console.log("a user connected socket io",socket.id);

    /* Event consts */
    socket.on('client-a:current-wheater', async(data:CurrentWeatherIot) => {
        /* console.log("Data",data); */
        io.emit('server:current-wheater', data)
        saveCurentWeather(data)
    })

    /* Ui Events */
    socket.on('client:click-switch-mode', () => {
        console.log("click switch mode");
        io.emit('server:send-switch-mode',{"status":"swtch"})
    })

    socket.on('client:click-switch-rele', () => {
        console.log("click switch rele");
        io.emit('server:send-switch-rele',{"status":"swtch"})
    })

    socket.on('client-a:current-status', (data:{isAutomatic:boolean, statusRele:boolean}) => {
        console.log("accion arduino", data);
        io.emit('server:current-staus', data)
    })
        
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
});


  
/* express server */
httpServer.listen(port)
console.log(`server ready on port http://localhost:${port}`);