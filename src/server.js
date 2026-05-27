import 'dotenv/config';
import express from 'express';
import pool from './models/db.js';
import { getAllTodos, createATodo, changingTheTitle, completedATask, deleteATask } from './models/todoModel.js';
import { createUser, getUserByEmail } from './models/userModel.js';
import router from './routes/authRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import { requireAuth } from './middleware/authMiddle.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use('/auth', router);
app.use('/todos', todoRouter);


app.get('/', async (req, res) => {
    res.json({ status: 'OK' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});