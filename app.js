// Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Config parameters
require('dotenv').config();

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (error)=> console.error(error) )
db.once('open', () => console.log('Connected to DB'));

//Port assignment
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})

//Home Route
app.get('/',(req,res) => {
    res.send('Hello World!!!');
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers',subscribersRouter)