import {getUserByEmail} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;


export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({error: 'Fields cannot be empty'});
        } if (!email.includes('@') || !email.includes('.')){
            return res.status(400).json({error: 'Invalid email format'});
        } else{
            const getUser = await getUserByEmail(email);
            //console.log('getUser in login controller:', getUser);
            if (!getUser){
                return res.status(404).json({error: 'User not found'});
            } else{
                const passwordMatch = await bcrypt.compare(password, getUser.password);
                if (!passwordMatch){
                    return res.status(401).json({error: 'Incorrect password'});
                } else{
                    const token = jwt.sign({ userid: getUser.userid }, JWT_SECRET, { expiresIn: '2h' });
                    res.status(200).json({ message: 'Login successful', token});
                }
            }
        }
    } catch (error){
        throw error;
    }
};