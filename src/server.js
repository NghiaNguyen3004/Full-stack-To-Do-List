import 'dotenv/config';
import express from 'express';
import pool from './models/db.js';
import { getAllTodos } from './models/todoModel.js';
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
    const allTodos = getAllTodos();
    console.log(allTodos);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});