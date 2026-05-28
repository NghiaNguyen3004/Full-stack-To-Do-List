import '../styles/loginPage.css';
import { useState } from 'react';
export  default function RegisterForm ({onSubmit}){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleNameInput =(e)=>{
            setName(e.target.value)
        }
    
    const handleEmailInput =(e)=>{
        setEmail(e.target.value)
    }
    
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit(name, email, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Your name" onChange={handleNameInput} />
            </div>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="you@example.com" onChange={handleEmailInput} />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="········" onChange={handlePassword} />
            </div>
            <button className="submit-btn" type="submit">
                    Create account
            </button>
            
        </form>
    )
}