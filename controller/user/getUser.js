import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select(['-password']);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ msg: error.message });
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

export default getUser;
