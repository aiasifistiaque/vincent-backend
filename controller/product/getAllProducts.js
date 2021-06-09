import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getAllProducts = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.body.sort;

	if (option == 'Newest') sort = '-createdAt';
	else if (option == 'Oldest') sort = 'createdAt';
	else if (option == 'Name Asc') sort = 'name';
	else if (option == 'Name Dsc') sort = '-name';
	else if (option == 'Category') sort = 'category';
	else if (option == 'Sub Category') sort = 'subCategory';

	const products = await Product.find().sort(sort);

	if (products) {
		res.status(200).json(products);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export default getAllProducts;
