import express from 'express';
import {
	getAllCategories,
	getSubCategories,
	getProductByCategory,
	getHomeProductByCategory,
} from '../controller/product/getAllCategories.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/sub', getSubCategories);
router.post('/cat/:id', getProductByCategory);
router.get('/homecat/:id', getHomeProductByCategory);

export default router;
