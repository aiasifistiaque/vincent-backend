import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},

		status: {
			type: String,
			default: 'visible',
		},

		wishlisted: {
			type: Number,
			default: 0,
		},

		subCategory: {
			type: String,
		},

		description: {
			type: String,
		},

		note: {
			type: String,
		},

		specs: [
			{
				specification: String,
				value: String,
			},
		],

		price: {
			type: Number,
			required: true,
			default: 0,
		},

		size: {
			type: String,
			default: '0oz',
		},

		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},

		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		totalSold: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
