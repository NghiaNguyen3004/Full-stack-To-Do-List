import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
    const registerController = await import('../controllers/register.js');
    registerController.register(req, res);
});


export default router;