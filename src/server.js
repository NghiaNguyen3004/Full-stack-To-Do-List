import 'dotenv/config';
import express from 'express';
import router from './routes/authRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import { requireAuth } from './middleware/authMiddle.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 
        'https://full-stack-to-do-list-delta.vercel.app'], // Adjust this to match your frontend URL and port
    credentials: true // Allow cookies to be sent with requests
}));


app.use(express.json());
app.use('/auth', router);
app.use('/todos', todoRouter);


app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});