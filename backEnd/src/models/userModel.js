import pool from './db.js';

export const createUser = async(name, email, password) =>{
    try{
        const insertUser = await pool.query("INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING name, email", [name, email, password]);
        return insertUser.rows[0];
    } catch(error){
        throw error;
    }
};

export const getUserByEmail = async(email) => {
    try{
        const userByEmail = await pool.query("SELECT name, email, userid, password FROM users WHERE email = $1", [email]);
        return userByEmail.rows[0];
    } catch(error){
        throw error;
    }
};


