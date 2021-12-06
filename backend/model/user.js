const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userID: { type: String, required: true },
  spending: { type: Number, required: true, default: 0 },
})

module.exports = model('User', userSchema)
