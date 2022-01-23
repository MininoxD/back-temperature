import { Request } from "express";

export interface Weather{
    _id: string
    temperature: number
    humidity: number
    createdAt: Date
    updatedAt: Date
}

export interface CurrentWeather{
    _id: string
    humidity: number
    temperatureF: number
    temperatureC: number
    hotIndexF: number
    hotIndexC: number
    createdAt: Date
    updatedAt: Date
}

export interface CustomRequest<T> extends Request {
    body: T
}