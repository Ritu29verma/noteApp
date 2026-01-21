import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Main from './pages/Main'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
function App() {

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
       <Route path="/Main" element={<Homepage />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
