import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

const resetPassword = asyncHandler(async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email });

		console.log(foundUser);

		if (foundUser == null) res.status(400).send('Error, try again');

		if (foundUser.resetCode != req.body.otp) {
			res.status(400).send('OTP has expired, try again');
		}

		const salt = await bcrypt.genSalt(10);
		foundUser.password = await bcrypt.hash(req.body.password, salt);
		foundUser.resetCode = null;

		const changed = await foundUser.save();

		res.status(200).json({ status: 'success', email: changed.email });
	} catch (error) {
		console.log(error);
		res.status(500).json('Error, try again');
	}
});

export default resetPassword;
