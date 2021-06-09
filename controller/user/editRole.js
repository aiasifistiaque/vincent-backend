import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const editRole = asyncHandler(async (req, res) => {
	const { role, id } = req.body;
	try {
		const user = await User.findById(id).select(['-password']);
		user.role = role;
		const savedUser = user.save();
		console.log(savedUser);
		res.status(200).json(savedUser);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default editRole;
