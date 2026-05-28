import pool from './db.js';

export const getAllTodos = async (userID) =>{
    try {
        const getAllTodo = await pool.query('SELECT todos.*, users.email FROM todos JOIN users ON users.userid = todos.user_id WHERE user_id = $1 ORDER BY todos.created_at DESC', [userID]);
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
export const completedATask = async(id, userid) =>{
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        await client.query('UPDATE todos SET completed = true WHERE id = $1 AND user_id = $2 RETURNING *',[id, userid])
        await client.query('INSERT INTO completedtodo (todoid, user_id, title) SELECT id, user_id, title FROM todos WHERE id = $1 AND user_id = $2',[id, userid])
        
        const result = await client.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *',[id, userid] )
        await client.query('COMMIT')
    return result.rows[0]
    } catch(err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
};

export const getAllCompletedTodos = async (userID) =>{
    
    try {
        const getAllCompletedTodo = await pool.query('SELECT completedtodo.*, users.email FROM completedtodo JOIN users ON users.userid = completedtodo.user_id WHERE completedtodo.user_id = $1', [userID]);
        return (getAllCompletedTodo.rows);
    } catch(error){
        throw error;
    }
};

export const undoneATask = async(id, userid) =>{
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
    
        await client.query('INSERT INTO todos (user_id, title) select user_id, title from completedtodo where todoid = $1 and user_id = $2 SET completed = false returning *',[id, userid])
        const result = await client.query('DELETE FROM completedtodo WHERE todoid = $1 AND user_id = $2 RETURNING *',[id, userid] )
        await client.query('COMMIT')
    return result.rows[0]
    } catch(err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
    try{
        const taskUndone = await pool.query('BEGIN; INSERT INTO todos (user_id, title) select user_id, title from completedtodo where todoid = $1 and user_id = $2 returning *; DELETE FROM completedtodo WHERE todoid = $1 and user_id = $2; COMMIT;', [id, userid]);
        return (taskUndone.rows[0]);
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