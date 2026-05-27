import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/authContext.jsx'
import { registerUser} from '../services/api.js'


const RegisterPage = () => {
    const {login} = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleNameInput =(e)=>{
        setName(e.target.value)
    }

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
        <div>
            <form onSubmit= {handleSubmit}>
                <input type = 'text' placeholder='Name' value = {name} onChange ={handleNameInput}></input>
                <input type = 'email' placeholder='Email' value = {email} onChange ={handleEmailInput}></input>
                <input type = 'password' placeholder='Password' value = {password} onChange={handlePassword}></input>
                <button disabled={loading} >{loading? "Registering ...": "Register"}</button>
            </form>
            
        </div>
        
    )

}

export default RegisterPage;
