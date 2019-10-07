const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid');
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  _id: {
    type: String
  }
})

let User = mongoose.model('user', userSchema);

let exerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: Date
})

let Exercise = mongoose.model('exercise', exerciseSchema);

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// user creation
app.post('/api/exercise/new-user', (req, res) => {
  let { username } = req.body;
  let user = new User({
    username: username,
    _id: shortid.generate()
  });
  
  user.save((err, data) => {
    if(err) res.send(err);
    else res.send(data);
  });
})

// exercise add
app.post('/api/exercise/add', (req, res) => {
  let { userId, description, date, duration } = req.body;
  User.findOne({ _id: userId }, (err, data) => {
    if(err) console.log(err)
    else {
      if (data) {
        if (description && duration) {
          let exercise = new Exercise({
            userId: userId,
            description: description,
            duration: duration,
            date: date ? new Date(date) : new Date()
          })
          exercise.save((err, data) => {
            if (err) res.send(err)
            else res.send(data)
          })
        }
      } else {
        res.send({error: 'The user does not exist'})
      }
    }
  })
})

// get all users
app.get('/api/exercise/users', (req, res) => {
  User.find({}, (err, data) => {
    if(err) res.send(err)
    else res.send(data)
  })
})

// get exercise log
app.get('/api/exercise/log?userId=:userId', (req, res) => {
  let { userId, from, to, limit } = req.params;
  console.log(req.query, req.params)
  Exercise.find({ userId: userId }, (err, data) => {
    if(err) res.send(err)
    else res.send(data)
  })
})

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
