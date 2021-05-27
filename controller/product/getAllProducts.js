import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();

	if (products) {
		res.status(200).json(products);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export default getAllProducts;
