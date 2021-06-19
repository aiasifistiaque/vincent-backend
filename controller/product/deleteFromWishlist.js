import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const deleteFromWishlist = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select(['-password']);
		const product = await Product.findById(req.params.id);

		if (!user) {
			console.log('user not found');
			return res.status(400).send('User does not exist');
		}

		if (!product) {
			console.log('product not found');
			return res.status(400).send('product does not exist');
		}

		if (user && product) {
			const notInWishlist = user.wishlist.find(r => r == req.params.id);

			if (!notInWishlist) {
				console.log('item not in wishlist');
				return res.status(400).send('Item Not in wishlist');
			} else {
				const newWishList = user.wishlist.filter(x => x != req.params.id);

				user.wishlist = newWishList;
				const saveUser = await user.save();

				product.wishlisted = product.wishlisted - 1;
				const saveProd = await product.save();

				res.status(200).json({ success: true, wishlist: saveUser.wishlist });
			}
		}
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default deleteFromWishlist;
