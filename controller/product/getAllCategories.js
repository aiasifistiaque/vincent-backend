import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Product.distinct('category');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getProductByCategory = asyncHandler(async (req, res) => {
	const categories = await Product.find({ category: req.params.id });

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getSubCategories = asyncHandler(async (req, res) => {
	const categories = await Product.distinct('subCategory');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});
