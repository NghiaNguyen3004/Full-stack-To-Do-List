import pool from './db.js';

export const createUser = async(name, email, password) =>{
    try{
        const insertUser = await pool.query("")
    } catch(error){
        throw error;
    }
}


