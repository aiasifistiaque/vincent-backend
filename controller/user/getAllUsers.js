import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getAllUsers = asyncHandler(async (req, res) => {
	try {
		const user = await User.find().select(['-password']);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ msg: error.message });
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

export default getAllUsers;
