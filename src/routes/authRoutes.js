import express from 'express';
const registerController = await import('../controllers/register.js');
const loginController = await import('../controllers/login.js');
const router = express.Router();

router.post('/register', async (req, res) => {

    registerController.register(req, res);
});

router.post('/login', async (req, res) => {
    loginController.login(req, res);
});


export default router;