import 'dotenv/config';
import express from 'express';
import pool from './models/db.js';
import { getAllTodos, createATodo, changingTheTitle, completedATask, deleteATask } from './models/todoModel.js';
import { createUser, getUserByEmail } from './models/userModel.js';
import router from './routes/authRoutes.js';
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/auth', router);

app.get('/', async (req, res) => {
    //res.json({ status: 'OK' });
    const allTodos = await getAllTodos(1);
    //console.log(allTodos);

    //Testing code
    /*
    console.log("After creating a new todo");
    const createTodo = await createATodo('test todo 2', 1);
    console.log(allTodos);
    */

    //Testing updating function
    /*
    const titleChange = await changingTheTitle("To do changed again", 3);
    console.log(titleChange);

    const taskCompleted = await completedATask(3);
    console.log(taskCompleted);
    */

    //Testing deleting function
    //const deleteTask = await deleteATask(5);
    //console.log(allTodos);

    //Testing create a user function
    //const newlyCreatedUser = await createUser('Nghia2', 'abcd@gmail.com', '147891');
    //console.log(newlyCreatedUser);

    //Testing get user by email function
    /*
    const getUserEmail = await getUserByEmail('abc@gmail.com');
    console.log(getUserEmail);
    const getUser2Email = await getUserByEmail('abcd@gmail.com');
    console.log(getUser2Email);
    */


});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});