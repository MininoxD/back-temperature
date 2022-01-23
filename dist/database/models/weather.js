"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherModel = void 0;
const mongoose_1 = require("mongoose");
const WeatherSchema = new mongoose_1.Schema({
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.WeatherModel = (0, mongoose_1.model)('Weather', WeatherSchema);
