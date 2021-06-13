import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getAllOrders = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.body.sort;
	const perPage = 10;
	const page = req.body.page || 0;

	if (option == 'Newest') sort = '-createdAt';
	else if (option == 'Oldest') sort = 'createdAt';
	else if (option == 'Pending') {
		try {
			const count = await Order.countDocuments({
				status: { $ne: 'completed' },
			});

			const orders = await Order.find({
				status: { $ne: 'completed' },
			})
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Completed') {
		try {
			const count = await Order.countDocuments({ status: 'completed' });
			const orders = await Order.find({ status: 'completed' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	}

	try {
		const count = await Order.countDocuments();
		const orders = await Order.find({})
			.populate('user', 'id name')
			.sort(sort)
			.skip(page * perPage)
			.limit(perPage);
		res.status(200).json({ orders: orders, count: count });
	} catch (e) {
		res.status(500);
		throw new Error('there was an error');
	}
});

export default getAllOrders;
