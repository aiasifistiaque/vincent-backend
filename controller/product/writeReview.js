import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const writeReview = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.body.id);

		const alreadyReviewed = product.reviews.find(
			r => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400).send('Product Already Reviewed');
			throw new Error('Product already reviewed');
		}

		const newReview = {
			rating: Number(req.body.rating),
			comment: req.body.comment,
			name: req.user.name,
			user: req.user._id,
		};
		product.reviews.push(newReview);

		console.log(product);

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		product.numReviews = product.reviews.length;

		const saveProd = product.save();

		res.status(201).json({ message: 'review added', product: saveProd });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e.message });
	}
});

export default writeReview;
