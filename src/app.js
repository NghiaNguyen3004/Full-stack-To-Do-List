import 'dotenv/config';
import express from 'express';
const PORT = process.env.PORT;

const app = express();
//Middleware to parse JSON data into what Express could read
//app.use(express.json());

app.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    next();
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
