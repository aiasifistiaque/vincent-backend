import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const createNewPorduct = asyncHandler(async (req, res) => {
	//console.log(req);
	try {
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			size: req.body.size,
			user: req.user._id,
			image: req.body.image,
			subCategory: req.body.subCategory,
			note: req.body.note,
			category: req.body.category,
			countInStock: req.body.countInStock,
			description: req.body.description,
		});
		const created = await product.save();
		res.status(201).json(created);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default createNewPorduct;
