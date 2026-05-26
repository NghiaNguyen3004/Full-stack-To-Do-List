export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try{
    
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        } else{
            const createUser = await createUser(name, email, password);
            return res.status(201).json(createUser);
        }
        if (email.length == 0){
            return res.status(400).json({ error: 'Email cannot be empty' });
        } else { 
            if (!email.includes('@') || !email.includes('.')) {
                return res.status(400).json({ error: 'Invalid email format' });
            } else{
                const getUser = await getUserByEmail(email);
                if (getUser){
                return res.status(409).json({ error: 'Email already exists' }); 
            }
        }
        }
        
    } catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
};