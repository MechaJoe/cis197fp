import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data === 'user created') {
      navigate('/login')
    } else {
      alert('Illegal username or password')
    }
  }

  return (
    <>
      <>
      </>
      username:
      {' '}
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      {' '}
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <Button type="button" onClick={createUser}> Sign Up </Button>
    </>
  )
}
