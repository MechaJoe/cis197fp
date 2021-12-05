import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [retry, setRetry] = useState(false)
  const navigate = useNavigate()

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'user logged in successfully') {
      navigate('/')
    } else {
      setRetry(true)
      alert('Invalid username or password')
    }
  }

  return (
    <>
      <>
        {retry ? <p>Username or password are incorrect.</p> : null}
      </>
      username:
      {' '}
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      {' '}
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <Button type="button" onClick={loginUser}> Login </Button>
      <div>
        <Link to="/signup">Don&apos;t have an account? Sign up now</Link>
      </div>
    </>
  )
}
