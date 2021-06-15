import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getUserOrders = asyncHandler(async (req, res) => {
	let select = { status: { $nin: ['completed,archived,cancelled'] } };
	const perPage = 10;
	const page = req.body.page || 0;

	try {
		if (req.body.status == 'Past') {
			select = { status: { $in: ['completed', 'archived', 'cancelled'] } };
		} else if (req.body.status == 'Current') {
			select = { status: { $nin: ['completed', 'archived', 'cancelled'] } };
		}

		const count = await Order.countDocuments({
			$and: [{ user: req.user._id }, select],
		});

		const orders = await Order.find({
			$and: [{ user: req.user._id }, select],
		})
			.sort('-createdAt')
			.skip(page * perPage)
			.limit(perPage)
			.populate('user', 'id name');
		res.status(200).json({ orders: orders, count: count });
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: e.message });
	}
});

export default getUserOrders;
