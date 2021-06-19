import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const changePicture = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.body.id);
		product.image = req.body.image;
		const saveProd = product.save();
		res.status(200).json(saveProd);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default changePicture;
