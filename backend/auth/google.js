const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user')
const config = require('../_config')
const init = require('./init')

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  scope: ['profile', 'email'],
},
((accessToken, refreshToken, profile, cb) => {
  const searchQuery = {
    username: `${profile.name.givenName} ${profile.name.familyName}`,
  }

  // TODO: Check whether the user already exists in the db

  const updates = {
    username: `${profile.name.givenName} ${profile.name.familyName}`,
    userID: profile.id,
  }

  const options = {
    upsert: true,
  }
  // update the user if s/he exists or add a new user
  User.findOneAndUpdate(searchQuery, updates, options, (err, user) => cb(err, user))
})))

// serialize user into the session
init()

module.exports = passport
