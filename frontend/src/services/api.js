const SERVER_URL = 'http://localhost:3000';

export const registerUser = async (name, email, password) => {
    const registerResponse = await fetch(`${SERVER_URL}/auth/register`, {
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
    const loginResponse = await fetch(`${SERVER_URL}/auth/login`, {
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
    const allTodosRes = await fetch (`${SERVER_URL}/todos`, {
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

export const createTodo = async (title, token) => {
    const createTodoRes = await fetch(`${SERVER_URL}/todos`, {
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
    const updatedTitleRes = await fetch(`${SERVER_URL}/todos/${id}`, {
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

export const toggleTodoCompletion = async (id, token) => {
    const toggleCompletionRes = await fetch(`${SERVER_URL}/todos/complete/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!toggleCompletionRes.ok) {
        throw new Error('Failed to toggle todo completion');
    }
    return await toggleCompletionRes.json();

}

export const deleteTodo = async (id, token) =>{
    const deleteTodoRes = await fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!deleteTodoRes.ok) {
        throw new Error('Failed to delete todo');
    }
}