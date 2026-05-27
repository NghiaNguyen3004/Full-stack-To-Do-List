import {useState, useEffect} from 'react';
import {getAllTodos} from '../services/api.js';
import {useAuth} from '../context/authContext.jsx';
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
    return(
        <div>
            <h1>ToDo List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoPage;