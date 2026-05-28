import '../styles/todosPage.css';

export default function ToDoItem({todo, onComplete, onDelete}){
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            
            <div 
                className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onComplete(todo.id)}
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