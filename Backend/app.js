const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));


// database connection with mongoose
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Mongoose Connected'))
    .catch((err)=>console.log('Error to Connect'))

const userRouter = require('./Routes/user');
const categoryRouter = require('./Routes/category');
const todoRouter = require('./Routes/todo');


app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/todos', todoRouter)
  
module.exports = app;