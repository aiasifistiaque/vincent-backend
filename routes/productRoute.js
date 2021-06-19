import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getAllProducts from '../controller/product/getAllProducts.js';
import getSingleProduct from '../controller/product/getSingleProduct.js';
import createNewPorduct from '../controller/product/createNewProduct.js';
import deleteProduct from '../controller/product/deleteProduct.js';
import editProduct from '../controller/product/editProduct.js';

const router = express.Router();

router.post('/', getAllProducts);

router.post('/createproduct', protect, admin, createNewPorduct);

router.post('/changepicture', protect, admin, createNewPorduct);

router
	.route('/:id')
	.get(getSingleProduct)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, editProduct);

export default router;
