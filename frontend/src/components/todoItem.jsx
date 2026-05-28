import '../styles/todosPage.css';
import { useState } from 'react';

export default function ToDoItem({todo, onComplete, onDelete}){
    const [completing, setCompleting] = useState(false);
    const handleClick = async()=>{
        setCompleting(true);
        setTimeout(()=>{
            onComplete(todo.id);
        },300)
        
    }
    return (
        <li className={`todo-item ${completing ? 'completing' : ''}`}>
            
            <div 
                className={`todo-checkbox ${completing ? 'checked' : ''}`}
                onClick={handleClick}
            />
            <span className="todo-title">{todo.title}</span>
            <div className="todo-actions">
                <button 
                    className="todo-action-btn delete" 
                    onClick={() => onDelete(todo.id)}
                >
                    delete
                </button>
            </div>

        </li>
    );
}