import '../App.css';

export default function ToDoItem({todo, onComplete, onDelete}){
    return (
        <div className="card">
            <span className="todo-title">{todo.title}</span>
            <div className="todo-actions">
                <button onClick={() => onComplete(todo.id)}>Complete</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </div>
    );
}