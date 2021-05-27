import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already registered..');

	user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();

	res
		.status(200)
		.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email', 'role']));
});

export default router;
