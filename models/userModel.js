import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true,
			trim: true,
		},
		phone: {
			type: String,
			minlength: 8,
			maxlength: 255,
			trim: true,
		},

		address: String,
		city: String,
		postalCode: String,
		country: String,

		role: { type: String, default: 'user' },
		password: { type: String, required: true, minlength: 5, maxlength: 1024 },
	},
	{
		timestamps: true,
	}
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name, role: this.role },
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

export const User = mongoose.model('User', userSchema);

export function validate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
		role: Joi.string(),
	});
	return schema.validate(user);
}
