import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
// import { basicAuth } from './middleware/basicAuth.js';
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/users' , usersRoutes);    

app.get('/' , (req , res) => {
    res.send('HELLO FROM HOME PAGE');
});

app.listen(PORT , () => console .log(`Server running on port : http:localhost:${PORT}`));
//api