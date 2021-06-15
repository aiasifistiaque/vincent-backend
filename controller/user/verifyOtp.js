import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const verifyOtp = asyncHandler(async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email }).select([
			'-password',
		]);

		if (foundUser == null) res.status(400).send('Error, try again');

		if (foundUser.resetCode != req.body.otp) {
			res.status(400).send('Wrong Otp, try again');
		}

		res.status(200).json({ status: 'success', user: foundUser });
	} catch (error) {
		console.log(error);
		res.status(500).json('Error, try again');
	}
});

export default verifyOtp;
