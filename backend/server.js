const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
const swig = require('swig')
const UserRouter = require('./routes/account')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://MechaJoe:password1234@cluster0.eelcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const s = new swig.Swig()
app.engine('html', s.renderFile)
app.set('view engine', 'html')

// *** static directory *** //
app.set('views', path.join(__dirname, 'views'))

// handling POST --> req.body
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/public')))
app.use(session({
  name: 'session',
  keys: ['username', 'password'],
  secret: 'mySecret123',
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', UserRouter)
app.use(bodyParser.json())

// app.use((err, req, res, next) => {
//   res.status(500).send('Something broke!')
// })

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
