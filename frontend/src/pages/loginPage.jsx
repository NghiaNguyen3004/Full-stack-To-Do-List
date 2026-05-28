import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'
import { loginUser} from '../services/api.js'
import { LoginForm } from '../components/loginForm.jsx'


const LoginPage = () => {
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (email, password) =>{
        setLoading(true)
        try{
            const {token} = await loginUser(email, password);
            login(token)
            navigate('/todos')
        } catch (err) {
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <span className="login-badge">To-do app</span>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue</p>
                </div>
                <div className="login-card">
                    <LoginForm onSubmit={handleSubmit} />
                </div>

                 <p className="login-footer">
                    No account? <a href="/register">Register</a>
                </p>
            </div>
           
        </div>
    )

}

export default LoginPage;
