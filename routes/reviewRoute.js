import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import writeReview from '../controller/product/writeReview.js';

const router = express.Router();

router.put('/', protect, writeReview);

export default router;
