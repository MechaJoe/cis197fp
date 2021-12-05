const express = require('express')

const router = express.Router()
const passportLinkedIn = require('../auth/linkedin')
const passportGoogle = require('../auth/google')
const passportTwitter = require('../auth/facebook')

const User = require('../model/user')

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('username not found')
    } else {
      const { password: passDB } = user

      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(err)
  }
})

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin', { state: 'SOME STATE' }))

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.username = req.user.username
    req.session.userID = req.user.userID
    res.redirect('/')
  })

router.get('/auth/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'],
  }))

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.username = req.user.username
    req.session.userID = req.user.userID
    res.redirect('/')
  })

// check if user is authenticated
router.get('/session', (req, res) => {
  if (req.session.username) {
    res.send(req.session.username)
  } else {
    res.send('user is not logged in')
  }
})

module.exports = router
