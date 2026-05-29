import {Pool} from 'pg';
if (!process.env.DATABASE_URL) {
    throw new Error('Missing required environment variable: DATABASE_URL');
}

const pool = new Pool({connectionString: process.env.DATABASE_URL});

/*
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Current time:', res.rows[0].now);
    }
});
*/

export default pool;