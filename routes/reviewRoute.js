import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import writeReview from '../controller/product/writeReview.js';
import addToWishList from '../controller/product/addToWishList.js';
import deleteFromWishlist from '../controller/product/deleteFromWishlist.js';
import getWishList from '../controller/product/getWishlist.js';

const router = express.Router();

router.put('/', protect, writeReview);

router.post('/addtowishlist/:id', protect, addToWishList);
router.post('/deletefromwishlist/:id', protect, deleteFromWishlist);
router.get('/getwishlist', protect, getWishList);

export default router;
