import 'dotenv/config';
import express from 'express';
import router from './routes/authRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import { requireAuth } from './middleware/authMiddle.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }))
}
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/auth', router);
app.use('/todos', todoRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// Catch-all for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});