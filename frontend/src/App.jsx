import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/loginPage.jsx'
//import TodoPage from './pages/todoPage.jsx'
import { useAuth } from './context/authContext.jsx'

function App() {
  const {token} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element = {token? <Navigate to = '/todos'/> : <LoginPage/>}/>
        <Route path='/todos' element={token ? <div>Todos Page</div> : <Navigate to='/login'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;