import { CurrentWeatherModel } from "../database/models/currentWhater"
import { WeatherModel } from "../database/models/weather"
import { CurrentWeather, Weather } from "../interface"

export const getAllWheater = async()=>{
    return await WeatherModel.find()
}

export const createWeather = async(data: Pick<Weather,'temperature' | 'humidity'>)=>{
    return await WeatherModel.create(data)    
}

export const currentWeather = async(data: Omit<CurrentWeather,'_id' | 'createdAt' | 'updatedAt'>)=>{
    const currentWeather: CurrentWeather[] = await CurrentWeatherModel.find();
    if(!(currentWeather.length === 0)){
        const {_id} =  currentWeather[0]
        return await CurrentWeatherModel.findByIdAndUpdate(_id, data,{new: true})
    }else{
        return await CurrentWeatherModel.create(data)
    }
}

export const getCurrentWeather = async()=>{
    return await CurrentWeatherModel.find();
}

export const getLastWeather = async():Promise<Weather|null>=>{
    const lastWeather =  await WeatherModel.find().sort({createdAt: -1}).limit(1)
    if(lastWeather.length !== 0){
        return lastWeather[0]
    }
    return null
}