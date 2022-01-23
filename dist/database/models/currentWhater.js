"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeatherModel = void 0;
const mongoose_1 = require("mongoose");
const CurrentWeatherSchema = new mongoose_1.Schema({
    humidity: {
        type: Number,
        required: true,
    },
    temperatureF: {
        type: Number,
        required: true,
    },
    temperatureC: {
        type: Number,
        required: true,
    },
    hotIndexF: {
        type: Number,
        required: true,
    },
    hotIndexC: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
exports.CurrentWeatherModel = (0, mongoose_1.model)('CurrentWeather', CurrentWeatherSchema);
