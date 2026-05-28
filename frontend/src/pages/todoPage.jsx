import {useState, useEffect} from 'react';
import {getAllTodos, createTodo, deleteTodo} from '../services/api.js';
import {useAuth} from '../context/authContext.jsx';
import ToDoItem from '../components/todoItem.jsx';
import { FormItem } from '../components/formItem.jsx';
import '../styles/todosPage.css';
const ToDoPage = ()=>{
    const {token} = useAuth();
    const [todos, settodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchToDos = async ()=>{
            try{
                
                const data = await getAllTodos(token);
                settodos(data);
            }catch(err){
                setError('Failed to fetch ToDos');
            }finally{
                setLoading(false);
            }
        }
        fetchToDos();
    }, [token]);

    const handleSubmit = async (title)=>{
        // Logic to add new ToDo
        try{
            const newTodo = await createTodo(title, token);
            settodos([...todos, newTodo]);
        } catch(err){
            setError('Failed to create ToDo');
        }
    }

    const handleDelete = async (id) =>{
        // Logic to delete ToDo
        try{
            await deleteTodo(id, token);
            settodos(todos.filter(todo => todo.id !== id));

        } catch(err){
            setError('Failed to delete ToDo');
        }
    }
    return(
        <div className="todos-page">
            <nav className="todos-navbar">
                <span className="navbar-brand">To-do app</span>
                    <div className="navbar-right">
                        <span className="navbar-user">hello, {name}</span>
                        {/* <button className="logout-btn" onClick={logout}>Logout</button> */}
                    </div>
            </nav>

    <main className="todos-main">
        <div className="todos-header">
            <span className="todos-badge">My tasks</span>
            <h1 className="todos-title">What's on your plate</h1>
            <p className="todos-count">{todos.length} tasks total</p>
        </div>

    <FormItem onSubmit={handleSubmit} />  {/* add classes inside FormItem */}

        <div className="todos-divider">
            <span className="divider-label">Tasks</span>
            <div className="divider-line"></div>
        </div>

    {loading && <p className="todos-loading">Fetching tasks...</p>}
    {error && <p className="todos-error">{error}</p>}
    {todos.length === 0 && !loading && <p className="todos-empty">No tasks yet — add one above</p>}

    <ul className="todos-list">
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </ul>
  </main>
</div>
    )
}

export default ToDoPage;