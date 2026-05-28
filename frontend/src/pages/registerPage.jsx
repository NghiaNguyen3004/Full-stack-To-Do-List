import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'
import { registerUser} from '../services/api.js'
import  RegisterForm  from '../components/registerForm.jsx'
import '../styles/loginPage.css';


const RegisterPage = () => {
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();


    const handleSubmit = async (name, email, password) =>{
        setLoading(true)
        try{
            const {token} = await registerUser(name,email, password);
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
                    <h1 className="login-title">Create account</h1>
                    <p className="login-subtitle">Start organizing your tasks</p>
                </div>
                <div className="login-card">
                    <RegisterForm onSubmit={handleSubmit} />
                </div>
                
                
                <p className="login-footer">
                    Already have an account? <a href="/login">Sign in</a>
                </p>
            </div>
        </div>
    )

}

export default RegisterPage;
