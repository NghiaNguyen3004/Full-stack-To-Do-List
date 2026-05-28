import '../styles/todosPage.css';

export default function CompletedToDoItem({completedtodo, onUnComplete, onDelete}){
    return (
        <li className="completed-item">
            
            <div 
                className="todo-checkbox checked"
                onClick={() => onUnComplete(completedtodo.todoID)}
            />
            <span className="todo-title">{completedtodo.title}</span>
            <div className="todo-actions">
                <button 
                    className="todo-action-btn delete" 
                    onClick={() => onDelete(completedtodo.todoID)}
                >
                    delete
                </button>
            </div>

        </li>
    );
}