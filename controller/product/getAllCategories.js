import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const getAllCategories = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const categories = await Product.distinct('category').sort(sort);

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getProductByCategory = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const perPage = 12;
	const page = req.body.page || 0;

	const categories = await Product.find({ category: req.params.id })
		.sort(sort)
		.skip(page * perPage)
		.limit(perPage);
	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getHomeProductByCategory = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const categories = await Product.find({ category: req.params.id })
		.sort(sort)
		.limit(6);

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getSubCategories = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const categories = await Product.distinct('subCategory');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});
