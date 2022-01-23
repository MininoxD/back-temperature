"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastWeather = exports.getCurrentWeather = exports.currentWeather = exports.createWeather = exports.getAllWheater = void 0;
const currentWhater_1 = require("../database/models/currentWhater");
const weather_1 = require("../database/models/weather");
const getAllWheater = async () => {
    return await weather_1.WeatherModel.find();
};
exports.getAllWheater = getAllWheater;
const createWeather = async (data) => {
    return await weather_1.WeatherModel.create(data);
};
exports.createWeather = createWeather;
const currentWeather = async (data) => {
    const currentWeather = await currentWhater_1.CurrentWeatherModel.find();
    if (!(currentWeather.length === 0)) {
        const { _id } = currentWeather[0];
        return await currentWhater_1.CurrentWeatherModel.findByIdAndUpdate(_id, data, { new: true });
    }
    else {
        return await currentWhater_1.CurrentWeatherModel.create(data);
    }
};
exports.currentWeather = currentWeather;
const getCurrentWeather = async () => {
    return await currentWhater_1.CurrentWeatherModel.find();
};
exports.getCurrentWeather = getCurrentWeather;
const getLastWeather = async () => {
    const lastWeather = await weather_1.WeatherModel.find().sort({ createdAt: -1 }).limit(1);
    if (lastWeather.length !== 0) {
        return lastWeather[0];
    }
    return null;
};
exports.getLastWeather = getLastWeather;
