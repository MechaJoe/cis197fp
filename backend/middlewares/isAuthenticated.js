const express = require('express')

const router = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.username !== undefined && req.session.username !== null
    && req.session.username !== '') {
    next()
  } else {
    next(new Error('You are not authenticated'))
  }
}

module.exports = isAuthenticated
