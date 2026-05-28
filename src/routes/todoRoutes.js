import express from 'express';
import {getAllTodosController, getAllCompletedTodosController, createATodoController, changingTheTitleController, completedATaskController, undoneATaskController, deleteATaskController} from '../controllers/todosController.js';
import {requireAuth} from '../middleware/authMiddle.js';
const todoRouter = express.Router();

todoRouter.get('/completed', requireAuth, getAllCompletedTodosController);
todoRouter.get('/', requireAuth, getAllTodosController);
todoRouter.post('/', requireAuth, createATodoController);
todoRouter.put('/completed/:id', requireAuth, completedATaskController);
todoRouter.put('/:id', requireAuth, changingTheTitleController);
todoRouter.patch('/uncompleted/:id', requireAuth, undoneATaskController);
todoRouter.delete('/:id', requireAuth, deleteATaskController);



export default todoRouter;