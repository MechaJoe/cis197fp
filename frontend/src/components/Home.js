import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ReceiptModal from './ReceiptModal'

export default function Home() {
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(async () => {
    const { data: potentialUsername } = await axios.get('/session')
    console.log(potentialUsername)
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
          Welcome,
          {' '}
          { username }
        </h2>
      ) : <Link to="/login">Login to view total spending.</Link>}
      <Button variant="primary" onClick={handleShow}>Add Receipt</Button>
      <ReceiptModal show={show} onHide={handleClose} />
    </>
  )
}
