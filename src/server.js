import 'dotenv/config';
import express from 'express';
import pool from './models/db.js';
import { getAllTodos, createATodo, changingTheTitle, completedATask } from './models/todoModel.js';
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get('/', async (req, res) => {
    //res.json({ status: 'OK' });
    const allTodos = await getAllTodos(1);
    //console.log(allTodos);

    //Testing code
    //console.log("After creating a new todo");
    //const createTodo = await createATodo('test todo 2', 1);
    //console.log(allTodos);

    //Testing updating function

    const titleChange = await changingTheTitle("To do changed again", 3);
    console.log(titleChange);

    const taskCompleted = await completedATask(3);
    console.log(taskCompleted);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});