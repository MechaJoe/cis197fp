const express = require('express')

const router = express.Router()
const passportLinkedIn = require('../auth/linkedin')
const passportGithub = require('../auth/google')
const passportTwitter = require('../auth/facebook')

const User = require('../model/user')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/login', (req, res, next) => {
  res.send('Go back and register!')
})

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin', { state: 'SOME STATE' }))

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.json(req.user)
  })

module.exports = router
