import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Login() {
  const navigate = useNavigate()

  return (
    <>
      <h1>QuickSplit</h1>
      <p>Welcome! Please Login.</p>
      <a href="/auth/linkedin" className="btn btn-default">LinkedIn</a>
      <a href="/auth/google" className="btn btn-default">Google</a>
    </>
  )
}
