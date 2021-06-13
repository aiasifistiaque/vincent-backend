import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
	'/',
	asyncHandler(async (req, res) => {
		let sort = 'createdAt';
		const option = req.body.sort;
		const page = req.body.page || 0;
		const perPage = 12;

		if (option == 'newest') sort = '-createdAt';
		else if (option == 'oldest') sort = 'createdAt';
		else if (option == 'nameAsc') sort = 'name';
		else if (option == 'nameDec') sort = '-name';
		else if (option == 'priceUp') sort = 'price';
		else if (option == 'priceDown') sort = '-price';

		const products = await Product.find({
			status: { $nin: ['hidden', 'archived'] },
		})
			.limit(perPage)
			.skip(page * perPage)
			.sort(sort);

		if (products) {
			res.status(200).json({
				products: products,
				sort: sort,
				items: products.length,
				page: page,
			});
		} else {
			res.status(500);
			throw new Error('there was an error');
		}
	})
);

export default router;
