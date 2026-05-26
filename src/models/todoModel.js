import pool from './db.js';

export const getAllTodos = async (userID) =>{
    try {
        const getAllTodo = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userID]);
        return (getAllTodo.rows);
    } catch(error){
        throw error;
    }
};

export const createATodo = async(title, userID) => {
    try{
        const createATodo = await pool.query('INSERT INTO todos(user_id, title) values ($1, $2) RETURNING * ', [title, userID]);
        return (createATodo.rows[0]);
    } catch(error){
        throw error;
    }
};