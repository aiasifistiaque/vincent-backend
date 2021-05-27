import express from 'express';
import {
	getAllCategories,
	getSubCategories,
	getProductByCategory,
} from '../controller/product/getAllCategories.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/sub', getSubCategories);
router.get('/cat/:id', getProductByCategory);

export default router;
