import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getAllProducts = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.body.sort;
	const perPage = 10;
	const page = req.body.page || 0;
	let select = { status: { $ne: 'archived' } };

	if (option == 'Newest') sort = '-createdAt';
	else if (option == 'Oldest') sort = 'createdAt';
	else if (option == 'Name Asc') sort = 'name';
	else if (option == 'Name Dsc') sort = '-name';
	else if (option == 'Category') sort = 'category';
	else if (option == 'Sub Category') sort = 'subCategory';
	else if (option == 'Hidden') select = { status: 'hidden' };
	else if (option == 'Archived') select = { status: 'archived' };
	else if (option == 'Visible')
		select = { status: { $nin: ['hidden', 'archived'] } };

	try {
		const count = await Product.countDocuments(select);
		const products = await Product.find(select)
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);
		res.status(200).json({ products: products, count: count });
	} catch (e) {
		res.status(500);
		throw new Error('there was an error');
	}
});

export default getAllProducts;
