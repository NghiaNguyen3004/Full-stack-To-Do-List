import pool from './db.js';

export const getAllTodos = async (userID) =>{
    try {
        const getAllTodo = await pool.query('SELECT todos.*, users.gmail FROM todos JOIN users ON users.userid = todos.user_id WHERE user_id = $1 ORDER BY todos.created_at DESC', [userID]);
        return (getAllTodo.rows);
    } catch(error){
        throw error;
    }
};

export const createATodo = async(title, userID) => {
    try{
        const createATodo = await pool.query('INSERT INTO todos(user_id, title) values ($1, $2) RETURNING * ', [userID, title]);
        return (createATodo.rows[0]);
    } catch(error){
        throw error;
    }
};


export const changingTheTitle = async(title, id) =>{
    try{
        const changeTheTitle = await pool.query('UPDATE todos SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
        return (changeTheTitle.rows[0]);
    } catch (error){
        throw error;
    }
};
export const completedATask = async(id) =>{
    try{
        const taskCompleted = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [true, id]);
        return (taskCompleted.rows[0]);
    } catch (error){
        throw error;
    }
};

export const deleteATask = async (id) => {
    try{
        const taskDeleted = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        return taskDeleted;
    } catch (error){
        throw error;
    }
};