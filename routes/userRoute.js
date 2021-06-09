import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getUser from '../controller/user/getUser.js';
import getAllUsers from '../controller/user/getAllUsers.js';
import getAnUser from '../controller/user/getAnUser.js';
import editRole from '../controller/user/editRole.js';

const router = express.Router();

router.route('/').post(protect, getUser);

router.route('/getallusers').post(protect, admin, getAllUsers);

router.route('/getanuser').post(protect, admin, getAnUser);

router.route('/editrole').post(protect, admin, editRole);

export default router;
