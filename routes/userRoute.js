import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getUser from '../controller/user/getUser.js';
import getAllUsers from '../controller/user/getAllUsers.js';
import getAnUser from '../controller/user/getAnUser.js';
import editRole from '../controller/user/editRole.js';
import getUserByMail from '../controller/user/getUserByMail.js';
import editUser from '../controller/user/editUser.js';
import sendOtp from '../controller/user/sendOtp.js';
import verifyOtp from '../controller/user/verifyOtp.js';
import resetPassword from '../controller/user/resetPassword.js';
import changePassword from '../controller/user/changePassword.js';

const router = express.Router();

router.route('/').post(protect, getUser);

router.route('/getallusers').post(protect, admin, getAllUsers);

router.route('/getanuser').post(protect, admin, getAnUser);

router.route('/getuserbymail').post(protect, admin, getUserByMail);

router.route('/editrole').post(protect, admin, editRole);

router.route('/edituser').put(protect, editUser);

router.route('/sendotp').post(sendOtp);

router.route('/verifyOtp').post(verifyOtp);

router.route('/resetpassword').post(resetPassword);

router.route('/changepassword').post(protect, changePassword);

export default router;
