import '../styles/todosPage.css';
import { useState } from 'react';

export default function CompletedToDoItem({completedtodo, onUnComplete, onDelete}){
    const [completing, setCompleting] = useState(false);
        const handleClick = async()=>{
            setCompleting(true);
            setTimeout(()=>{
                onUnComplete(completedtodo.todoid);
            },300)
    
        }
    return (
        <li className={`completed-item ${completing ? 'completing' : ''}`}>
            
            <div 
                className={`todo-checkbox ${completing ? '' : 'checked'}`}
                onClick={handleClick}
            />
            <span className="todo-title">{completedtodo.title}</span>
            <div className="todo-actions">
                <button 
                    className="todo-action-btn delete" 
                    onClick={() => onDelete(completedtodo.todoid)}
                >
                    delete
                </button>
            </div>

        </li>
    );
}