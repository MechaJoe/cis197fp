import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ReceiptModal from './ReceiptModal'
import Splitter from './Splitter'

export default function Home() {
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [spending, setSpending] = useState(0)
  const [payers, setPayers] = useState(0)
  const [expenses, setExpenses] = useState(0)
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

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { userSpending } = (await axios.get('/spending')).data
      setSpending(userSpending)
      console.log(payers)
    },
    2000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(async () => {
    const { data } = await axios.get('/splitting')
    // console.log(data)
    const { payers: potPayers, expenses: potExpenses } = data
    setPayers(parseInt(potPayers, 10))
    setExpenses(parseInt(potExpenses, 10))
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
      {loggedIn && (
        <h2>
          Your total spending is:
          {' '}
          { spending }
        </h2>
      )}
      <ReceiptModal
        show={show}
        onHide={handleClose}
      />
      {(payers > 0) && <Splitter expenses={expenses} payers={payers} />}
    </>
  )
}
