import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		await product.remove();
		res.status(200).json({ msg: 'product removed' });
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default deleteProduct;
