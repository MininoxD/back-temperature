require('dotenv').config()
import { connect } from "mongoose";
const URL = process.env.DB_CONNECTION || ''

connect(URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("Error: ", err));
    