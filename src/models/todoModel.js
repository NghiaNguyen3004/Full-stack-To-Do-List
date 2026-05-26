import pool from './db.js';

export const getAllTodos = async () =>{
    try {
        const getAllTodos = await pool.query("SELECT * FROM todos")
    } catch(error){
        throw new Error ("User ID doesn't exist");
    }
};