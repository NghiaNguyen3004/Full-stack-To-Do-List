import {useState, useEffect} from 'react';
import {getAllTodos, createTodo} from '../services/api.js';
import {useAuth} from '../context/authContext.jsx';
import ToDoItem from '../components/todoItem.jsx';
const ToDoPage = ()=>{
    const {token} = useAuth();
    const [todos, settodos] = useState([]);
    const [newToDo, setNewToDo] = useState('');
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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Logic to add new ToDo
        try{
            const newTodo = await createTodo(newToDo, token);
            settodos([...todos, newTodo]);
        } catch(err){
            setError('Failed to create ToDo');
        } finally{
            setNewToDo('');
        }
    }
    return(
        <div>
            <h1>ToDo List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newToDo}
                    onChange={(e) => setNewToDo(e.target.value)}
                    placeholder="What you need to do?"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <ToDoItem key={todo.id} todo={todo} onComplete={()=>{}} onDelete={()=>{}}/>
                ))}
            </ul>
        </div>
    )
}

export default ToDoPage;