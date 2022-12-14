import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App