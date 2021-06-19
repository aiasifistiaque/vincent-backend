import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getWishList = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select(['wishlist']);

		if (!user) {
			return res.status(400).send('User does not exist');
		} else {
			res.status(200).json({ wishlist: user.wishlist });
		}
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default getWishList;
