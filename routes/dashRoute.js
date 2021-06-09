import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getDashBoard from '../controller/dash/getDashBoard.js';

const router = express.Router();

router.route('/').post(getDashBoard);

export default router;
