const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/exercise-tracker", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to database"));

//middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

//importing routes
const exercise_routes = require('./routes/exercise.route');

//home routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//api routing
app.use('/api/exercise', exercise_routes);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
