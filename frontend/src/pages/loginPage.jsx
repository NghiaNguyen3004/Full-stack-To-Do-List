import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'
import { loginUser} from '../services/api.js'


const LoginPage = () => {
    const {login} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleEmailInput =(e)=>{
        setEmail(e.target.value)
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
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
        <div>
            <form onSubmit= {handleSubmit}>
                <input type = 'email' value = {email} onChange ={handleEmailInput}></input>
                <input type = 'password' value = {password} onChange={handlePassword}></input>
                <button disabled={loading} >{loading? "Logging in ...": "Login"}</button>
            </form>
            
        </div>
        
    )

}

export default LoginPage;
