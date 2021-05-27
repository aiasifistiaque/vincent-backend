import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getSingleProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		res.status(404).json({ msg: error.message });
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

export default getSingleProduct;
