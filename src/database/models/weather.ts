import { Schema, model, Document } from 'mongoose';
import { Weather } from '../../interface';
type IWeather  = Weather & Document

const WeatherSchema: Schema = new Schema({
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },

},{timestamps: true})

export const WeatherModel = model<IWeather>('Weather', WeatherSchema)

