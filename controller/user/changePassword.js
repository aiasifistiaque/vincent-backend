import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

const changePassword = asyncHandler(async (req, res) => {
	let user = await User.findById(req.user._id);
	if (!user) return res.status(400).send('Email id does not exist');

	const validPassword = await bcrypt.compare(req.body.password, user.password);

	//console.log(validPassword);

	if (!validPassword) return res.status(400).send('Wrong password');

	if (req.body.password == req.body.newpass) {
		return res.status(400).send(`Your old password can't by your new password`);
	}

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(req.body.newpass, salt);
	user.resetCode = null;

	try {
		const savedUser = user.save();
		res.status(200).json({ message: 'Password changed Successfully' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: e.message });
	}
});

export default changePassword;
