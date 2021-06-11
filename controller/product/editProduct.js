import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const editProduct = asyncHandler(async (req, res) => {
	const { name, size, description, note, stock, price } = req.body;
	console.log(req.body);
	try {
		const product = await Product.findById(req.params.id);
		product.name = name;
		product.size = size || '';
		product.description = description || '';
		product.note = note || '';
		product.price = price || 0;
		product.countInStock = stock || 0;
		const saveProd = product.save();
		res.status(200).json(saveProd);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default editProduct;