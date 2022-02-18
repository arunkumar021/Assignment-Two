import express from 'express';
import { createUser, getUserWithId , deleteUser , updateUserInfo , login} from '../controllers/users.js';


const router = express.Router();

var users = [];

router.post('/login' , login);

router.post('/' , createUser);

router.get('/:id' , getUserWithId);

router.delete('/:id' , deleteUser);

router.patch('/:id' , updateUserInfo)

export default router;