import {useState, useEffect} from 'react';
import {getAllTodos, createTodo, deleteTodo, completeTodo, unCompleteTodo, getAllCompletedTodos} from '../services/api.js';
import {useAuth} from '../context/authContext.jsx';
import ToDoItem from '../components/todoItem.jsx';
import CompletedToDoItem from '../components/completedTodoItem.jsx';
import { FormItem } from '../components/formItem.jsx';
import '../styles/todosPage.css';
const ToDoPage = ()=>{
    const {token, name} = useAuth();
    const [activeTab, setActiveTab] = useState('active');
    const [todos, settodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchToDos = async ()=>{
            try{
                
                const data = await getAllTodos(token);
                const completedData = await getAllCompletedTodos(token);
                setCompletedTodos(completedData);
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

    const handleComplete = async (id) =>{
        // Logic to toggle completion status
        try{
            const completedTodo = await completeTodo(id, token)
            settodos(todos.filter(todo => todo.id !== id))
            setCompletedTodos([...completedTodos, completedTodo])
        } catch(err){
            console.log(err);
            setError('Failed to complete ToDo');
        }
    }

    const handleUnComplete = async (id) =>{
        try{
            const unCompletedTodo = await unCompleteTodo(id, token);
            setCompletedTodos(completedTodos.filter(completedtodo => completedtodo.id !== id));
            settodos([...todos, unCompletedTodo]);
        }
        catch(err){
            setError('Failed to uncomplete ToDo');
        }
    }

    //The UI of To do page.
    return(
        <div className="todos-page">
            <nav className="todos-navbar">
                <span className="navbar-brand">To-do app</span>
                    <div className="navbar-right">
                        <span className="navbar-user">hello, {name}</span>
                        {/* <button className="logout-btn" onClick={logout}>Logout</button> */}
                    </div>
            </nav>

        <div className="todos-header">
            <span className="todos-badge">My tasks</span>
            <h1 className="todos-title">What's on your plate</h1>
            <p className="todos-count">{todos.length} tasks total</p>
        </div>

        <FormItem onSubmit={handleSubmit} />  {/* add classes inside FormItem */}

        <div className="todos-tabs">
            <button 
                className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}>
                    Tasks ({todos.length})
            </button>

            <button 
                className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}>
                Completed ({completedTodos.length})
            </button>

        </div>

        {activeTab === 'active' && (
            <ul className="todos-list">
                {todos.map(todo => (
                <ToDoItem key={todo.id} todo={todo} onComplete={handleComplete} onDelete={handleDelete} />
                ))}
            </ul>
        )}

        {activeTab === 'completed' && (
            <ul className="completed-list">
                {completedTodos.map(completedtodo => (
                <CompletedToDoItem key={completedtodo.id} completedtodo={completedtodo} onUnComplete={handleUnComplete} onDelete={handleDelete} />
                ))}
            </ul>
        )}

        {loading && <p className="todos-loading">Fetching tasks...</p>}
        {error && <p className="todos-error">{error}</p>}
        {todos.length === 0 && !loading && <p className="todos-empty">No tasks yet — add one above</p>}
    
        </div>
    )
}

export default ToDoPage;