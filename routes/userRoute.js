import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getUser from '../controller/user/getUser.js';
import getAllUsers from '../controller/user/getAllUsers.js';

const router = express.Router();

router.route('/').post(protect, getUser);

router.route('/getallusers').post(protect, admin, getAllUsers);

export default router;
