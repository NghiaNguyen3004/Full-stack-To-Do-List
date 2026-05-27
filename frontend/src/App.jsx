import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import TodoPage from './pages/todoPage.jsx'
import { useAuth } from './context/authContext.jsx'

function App() {
  const {token} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element = {token? <Navigate to = '/todos'/> : <LoginPage/>}/>
        <Route path='/todos' element={token ? <TodoPage/> : <Navigate to='/login'/>}/>
        <Route path = '/register' element = {token? <Navigate to = '/todos'/> : <RegisterPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;