const express = require('express')

const router = express.Router()
const Question = require('../model/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// get all questions
router.get('/questions', async (req, res, next) => {
  try {
    const all = await Question.find()
    res.json(all)
  } catch (err) {
    next(err)
  }
})

// add question
router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const author = req.session.username
  try {
    await Question.create({ questionText, author })
    res.send('Question added')
  } catch (err) {
    next(err)
  }
})

// add answer
router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.findOneAndUpdate({ _id }, { answer })
    res.send('Answer added')
  } catch (err) {
    next(err)
  }
})

module.exports = router
