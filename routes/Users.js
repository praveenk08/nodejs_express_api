import express from 'express'
import {userRegister, login, fetchAllUser, fetchUserbyid, updateUserbyid,deleteUserbyid } from '../Controllers/user.js';

const router = express.Router();

router.post('/register/', userRegister)

router.post('/login/',login)

router.get('/fetch-user-list',fetchAllUser)

router.get('/fetch-user-list-byid/:id',fetchUserbyid)

router.put('/update-user-byid/:id',updateUserbyid)
 
router.delete('/delete-user-byid/:id',deleteUserbyid)
 
export default router;

