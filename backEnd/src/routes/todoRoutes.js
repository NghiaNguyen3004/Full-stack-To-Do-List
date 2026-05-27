import express from 'express';
import {getAllTodosController, createATodoController, changingTheTitleController, completedATaskController, deleteATaskController} from '../controllers/todosController.js';
import {requireAuth} from '../middleware/authMiddle.js';
const todoRouter = express.Router();

todoRouter.get('/', requireAuth, getAllTodosController);
todoRouter.post('/', requireAuth, createATodoController);
todoRouter.put('/:id', requireAuth, changingTheTitleController);
todoRouter.put('/complete/:id', requireAuth, completedATaskController);
todoRouter.delete('/:id', requireAuth, deleteATaskController);
export default todoRouter;