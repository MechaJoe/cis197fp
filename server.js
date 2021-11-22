const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const UserRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://MechaJoe:password1234@cluster0.eelcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['username', 'password'],
}))

// can only access req.session within a POST request
app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`hello ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', UserRouter)
app.use('/api', QuestionRouter)
app.use(bodyParser.json())

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
