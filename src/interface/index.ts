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

export interface CurrentWeatherIot{
    humidity: number
    temperatureF: number
    temperatureC: number
    hotIndexF: number
    hotIndexC: number
    isAutomatic: boolean
    statusRele: boolean
}

export interface CustomRequest<T> extends Request {
    body: T
}