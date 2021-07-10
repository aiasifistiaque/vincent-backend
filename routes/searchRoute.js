import express from 'express';
import Product from '../models/productModel.js';
//import City from '../models/cityModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
	let products = [];
	try {
		const regex = { $regex: req.body.searchString, $options: 'i' };
		if (req.body.searchString.length < 1)
			res.status(200).json({ products: [] });
		if (req.body.searchString.length > 0) {
			products = await Product.find()
				.where({
					$or: [{ name: regex }, { category: regex }],
					status: { $nin: ['archived', 'hidden'] },
				})
				.limit(5);
		}
		//console.log(products);
		res.status(200).json({ products: products });
	} catch (e) {
		res.status(500).json(error);
	}
});

export default router;
