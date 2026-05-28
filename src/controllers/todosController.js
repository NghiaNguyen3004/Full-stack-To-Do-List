
import { getAllTodos, getAllCompletedTodos, createATodo, changingTheTitle, completedATask, deleteATask } from '../models/todoModel.js';

export const getAllTodosController = async (req, res) => {
    const userID = req.userid;
    try{
        const allTodos = await getAllTodos(userID);
        res.json(allTodos);
    } catch(error){
        res.status(500).json({ error: error.message })  ;
    }  
};

export const getAllCompletedTodosController = async (req, res) => {
    const userID = req.userid;
    try{
        const allCompletedTodos = await getAllCompletedTodos(userID);
        res.json(allCompletedTodos);
    } catch(error){
        res.status(500).json({ error: error.message })  ;
    }
};

export const createATodoController = async (req, res) => {
    const userID = req.userid;
    //console.log('userid from middleware:', req.userid)
    const { title } = req.body;
    try{
        const newTodo = await createATodo(title, userID);
        res.status(201).json(newTodo);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const changingTheTitleController = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    try{
        const updatedTodo = await changingTheTitle(title, id);
        res.json(updatedTodo);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const completedATaskController = async (req, res) => {
    const { id} = req.params;
    const userid = req.userid;
    try{
        const completedTask = await completedATask(id, userid);
        res.json(completedTask);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const undoneATaskController = async (req, res) => {
    const { id} = req.params;
    const userid = req.userid;
    try{
        const undoneTask = await undoneATask(id, userid);
        res.json(undoneTask);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const deleteATaskController = async (req, res) => {
    const { id } = req.params;
    try{
        await deleteATask(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};