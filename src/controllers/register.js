import {getUserByEmail, createUser} from '../models/userModel.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        //Check if the fields is empty
        if (!name || !email || !password){
            return res.status(400).json({error: 'Fields cannot be empty' });
        }
        if (!email.includes('@') || !email.includes('.')){
            return res.status(400).json({error: 'Invalid email format' });
        }
        const getUser = await getUserByEmail(email);
        if (getUser){
            return res.status(409).json({error: 'Email already exists' });
        } else{
            const newUser = await createUser(name, email, password);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        }
        
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};