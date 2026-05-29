const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const authFetch = async(URL, options = {}) => {
    const response = await fetch(URL, options);
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }
    return response;
}

export const registerUser = async (name, email, password) => {
    const registerResponse = await authFetch(`${SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
        });
    if (!registerResponse.ok) {
        throw new Error('Failed to register user');
    }
    return await registerResponse.json();
};

export const loginUser = async (email, password) => {
    const loginResponse = await authFetch(`${SERVER_URL}/auth/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})

    });
    if (!loginResponse.ok) {
        throw new Error('Failed to login user');
    }
    return await loginResponse.json();
};

export const getAllTodos = async(token) =>{
    const allTodosRes = await authFetch (`${SERVER_URL}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!allTodosRes.ok) {
        throw new Error('Failed to fetch todos');
    }
    return await allTodosRes.json();
};

export const getAllCompletedTodos = async(token) =>{
    const allCompletedTodosRes = await authFetch (`${SERVER_URL}/todos/completed`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!allCompletedTodosRes.ok) {
        throw new Error('Failed to fetch completed todos');
    }
    return await allCompletedTodosRes.json();
}

export const createTodo = async (title, token) => {
    const createTodoRes = await authFetch(`${SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    });
    if (!createTodoRes.ok) {
        throw new Error('Failed to create todo');
    }
    return await createTodoRes.json();
};

export const updateTodoTitle = async (id, newTitle, token) => {
    const updatedTitleRes = await authFetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle })
    });
    if (!updatedTitleRes.ok) {
        throw new Error('Failed to update todo title');
    }
    return await updatedTitleRes.json();
}

export const completeTodo = async (id, token) => {
    console.log('completing todo with id:', id)
    console.log('token:', token)
    const toggleCompletionRes = await authFetch(`${SERVER_URL}/todos/completed/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!toggleCompletionRes.ok) {
        throw new Error('Failed to complete todo');
    }
    return await toggleCompletionRes.json();

}

export const unCompleteTodo = async(id, token)=>{
    const unCompleteRes = await authFetch(`${SERVER_URL}/todos/uncompleted/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!unCompleteRes.ok) {
        throw new Error('Failed to uncomplete todo');
    }
    return await unCompleteRes.json();
}

export const deleteTodo = async (id, token) =>{
    const deleteTodoRes = await authFetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!deleteTodoRes.ok) {
        throw new Error('Failed to delete todo');
    }
    return await deleteTodoRes.json();
}