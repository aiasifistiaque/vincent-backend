import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

const sendOtp = asyncHandler(async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email }).select([
			'-password',
		]);

		console.log(foundUser);
		if (foundUser == null) res.status(400).send('User not found');

		console.log(req.body, foundUser);

		const otp = otpGenerator.generate(6, {
			upperCase: false,
			specialChars: false,
			alphabets: false,
		});

		foundUser.resetCode = otp;

		const saveUser = await foundUser.save();

		if (saveUser) {
			sendOtpToMail(saveUser, otp);
			res.status(200).json({ status: 'sent', email: saveUser.email });
		} else {
			console.log(error);
			res.status(500).json({ msg: error.message });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error.message });
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

const sendOtpToMail = (user, otp) => {
	const from = `Vincent's Sphere <support@vincentsphere.com>`;

	try {
		var transporter = nodemailer.createTransport({
			host: 'mail.privateemail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'support@vincentsphere.com',
				pass: 'vincentsphere',
			},
		});

		var mailOptions = {
			from: from,
			to: user.email,
			subject: `Password Reset Request Code ${otp}`,
			text: 'Order placed Successfully',
			html: `<div>
					<h4 style="margin:0px;font-weight:400;">Hi, ${user.name}</h4>
                    <h5 style="margin-bottom:1px">We received a request to reset your Vincent's Sphere account password.</h5>
                    <h5 style="margin-bottom:5px">Enter the following password reset code:</h5>
                    <h2>${otp}</h2>
                    <hr/>
                    <p>This message was sent to ${user.email} at your request.</p>
                    <p style="margin:0px;">If you did not request a password reset, let us know:</p>
                    <br/>
                    <p style="margin:0px;">Phone: 01312-795919</p>
                    <p style="margin:0px;">Email: support@vincentsphere.com</p>
                    </div>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export default sendOtp;
