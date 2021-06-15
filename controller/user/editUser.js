import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const editUser = asyncHandler(async (req, res) => {
	const { name, phone } = req.body;

	try {
		const user = await User.findById(req.user._id).select(['-password']);
		user.name = name;
		user.phone = phone;
		const savedUser = user.save();
		res.status(200).json(savedUser);
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: e.message });
	}
});

export default editUser;
