import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Splitter from './components/Splitter'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/splitter" element={<Splitter />} />
        </Routes>
      </Router>
    </>
  )
}
