import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getAllUsers = asyncHandler(async (req, res) => {
	let sort = { role: ['user', 'admin', 'manager'] };
	const option = req.body.sort;
	const perPage = 10;
	const page = req.body.page || 0;

	if (option == 'User') sort = { role: 'user' };
	if (option == 'Admin') sort = { role: 'admin' };

	try {
		const count = await User.countDocuments(sort);
		const user = await User.find(sort)
			.skip(page * perPage)
			.limit(perPage)
			.select(['-password']);
		res.status(200).json({ user: user, count: count });
	} catch (error) {
		res.status(500).json({ msg: error.message });
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

export default getAllUsers;
