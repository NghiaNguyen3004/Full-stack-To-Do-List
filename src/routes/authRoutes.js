import express from 'express';
const registerController = await import('../controllers/register.js');
const loginController = await import('../controllers/login.js');
const router = express.Router();

router.post('/register', registerController.register);

router.post('/login', loginController.login);


export default router;