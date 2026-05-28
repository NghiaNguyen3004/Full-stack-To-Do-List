import {getUserByEmail, createUser} from '../models/userModel.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

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
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await createUser(name, email, hashedPassword);
            const token = jwt.sign({ userid: newUser.userid}, JWT_SECRET, { expiresIn: '2h' });
            res.status(201).json({ message: 'User created successfully', token });
        }
        
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};