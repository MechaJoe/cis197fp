import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import NewQuestionModal from './NewQuestionModal'
import NewAnswerModal from './NewAnswerModal'
import Question from './Question'

export default function Home() {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [id, setId] = useState('')
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data: questionList } = await axios.get('/api/questions')
      setData(questionList)
    },
    2000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(async () => {
    const { data: potentialUsername } = await axios.get('/account/session')
    if (potentialUsername === 'user is not logged in') {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
      setUsername(potentialUsername)
    }
  }, [])

  return (
    <>
      {loggedIn ? (
        <h2>
          User:
          {username}
        </h2>
      ) : <Link to="/login">Login to post questions</Link>}
      <div>{loggedIn && <Button type="button" onClick={handleShow}>Ask a new question</Button>}</div>
      <NewQuestionModal show={show} onHide={handleClose} />
      <NewAnswerModal _id={id} show={showAnswer} onHide={() => setShowAnswer(false)} />
      <>
        {data.map(question => (
          <Question
            key={question.questionText}
            onClick={() => {
              setShowAnswer(true)
              setId(question._id)
            }}
            questionText={question.questionText}
            author={question.author}
            answer={question.answer}
            loggedIn={loggedIn}
          />
        ))}
      </>
      {loggedIn && (
      <Button
        variant="outline-primary"
        type="submit"
        onClick={() => {
          axios.post('/account/logout', { username })
          navigate('/logout')
        }}
      >
        Log Out
      </Button>
      )}
    </>
  )
}
