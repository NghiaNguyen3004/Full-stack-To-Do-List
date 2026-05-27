import express from 'express';
const registerController = await import('../controllers/register.js');
const router = express.Router();

router.post('/register', async (req, res) => {

    registerController.register(req, res);
});


export default router;