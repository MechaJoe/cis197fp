const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user')
const config = require('../_config')
const init = require('./init')

passport.use(new LinkedInStrategy({
  clientID: config.linkedin.clientID,
  clientSecret: config.linkedin.clientSecret,
  callbackURL: config.linkedin.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
},
// linkedin sends back the tokens and profile info
((accessToken, refreshToken, profile, done) => {
  const searchQuery = {
    username: profile.displayName,
  }

  const updates = {
    username: profile.displayName,
    userID: profile.id,
  }

  const options = {
    upsert: true,
  }

  User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err, null)
    }
    return done(null, user)
  })
})))

// serialize user into the session
init()

module.exports = passport
