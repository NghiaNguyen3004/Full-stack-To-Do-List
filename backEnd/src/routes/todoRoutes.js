import express from 'express';
import {getAllTodosController, createATodoController} from '../controllers/todosController.js';
import {requireAuth} from '../middleware/authMiddle.js';
const todoRouter = express.Router();

todoRouter.get('/', requireAuth, getAllTodosController);
todoRouter.post('/', requireAuth, createATodoController);
/*
todoRouter.put('/:id', requireAuth, changingTheTitle);
todoRouter.put('/complete/:id', requireAuth, completedATask);
todoRouter.delete('/:id', requireAuth, deleteATask);
*/
export default todoRouter;