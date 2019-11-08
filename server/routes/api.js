const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')

const mongoose = require('mongoose')

// replace your db connection string below
const db = "DB_CONNECTION_STRING";
// /dbname, if dbname did not exist in the server, that dbname will be created.

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    console.log('Error! ', err)
  } else {
    console.log('Connected to mongodb!')
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  const payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject;
  next();
}

router.get('/', (req, res) => {
  res.send('From API route')
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error)
    } else {
      // res.status(200).send(registeredUser)
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey') // secretKey can be anything
      res.status(200).send({ token })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('Invalid email')
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid password')
      } else {
        // res.status(200).send(user)
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      }
    }

  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    },
    {
      "_id": "2",
      "name": "Angular",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    },
    {
      "_id": "3",
      "name": "Authentication",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specials = [
    {
      "_id": "1",
      "name": "Netflix",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    },
    {
      "_id": "2",
      "name": "Legend",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    },
    {
      "_id": "3",
      "name": "Movie",
      "desciption": "Lorem ipsum",
      "date": "2019-10-10T17:00:00"
    }
  ]
  res.json(specials)
})

router.get('/special', (req, res) => {
  let events = []
  res.json(events)
})



module.exports = router