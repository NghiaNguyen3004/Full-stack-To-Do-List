import {useState} from 'react';
import '../styles/todosPage.css';

export const FormItem = ({onSubmit})=>{
    const [title, setTitle] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit(title);
        setTitle('');
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className = "create-form">
                <input
                    className='create-input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What you need to do?"
                />
                
                <button className="create-btn" type="submit">Add</button>
                </div>
            </form>
        </div>    
    )
}