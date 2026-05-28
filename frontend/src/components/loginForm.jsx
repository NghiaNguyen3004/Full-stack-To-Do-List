import { useState } from 'react';
import '../styles/loginPage.css';

export const LoginForm = ({onSubmit})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit(email, password);
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>Login</h2>
                <input
                className='form-input'
                    type="email"   
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                className='form-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" className='submit-btn'>Login</button>
            </form>
        </div>
    )
}