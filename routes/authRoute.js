import { User } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('email id does not exist');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) res.status(400).send('wrong password');

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		e => console.log(e);
	}
});

function validate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;
