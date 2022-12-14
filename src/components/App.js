import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Landing from './Landing'
import Login from './Login'
import NewBatch from './NewBatch'
import Signup from './Signup'
const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/:id/newbatch' element={<NewBatch/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App