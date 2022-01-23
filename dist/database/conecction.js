"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = require("mongoose");
const URL = process.env.DB_CONNECTION || '';
(0, mongoose_1.connect)(URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("Error: ", err));
