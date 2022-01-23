import { Schema, model, Document } from 'mongoose';
import { CurrentWeather } from '../../interface';
type ICurrentWeather  = CurrentWeather & Document

const CurrentWeatherSchema:Schema = new Schema({
    humidity:{
        type: Number,
        required: true,
    },
    temperatureF:{
        type: Number,
        required: true,
    },
    temperatureC:{
        type: Number,
        required: true,
    },
    hotIndexF:{
        type: Number,
        required: true,
    },
    hotIndexC:{
        type: Number,
        required: true,
    }
},{timestamps: true})

export const CurrentWeatherModel = model<ICurrentWeather>('CurrentWeather', CurrentWeatherSchema)

