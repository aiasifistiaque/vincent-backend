import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getAllOrders = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.body.sort;

	if (option == 'Newest') sort = '-createdAt';
	else if (option == 'Oldest') sort = 'createdAt';
	else if (option == 'Pending') {
		try {
			const orders = await Order.find({
				status: { $ne: 'completed' },
			})
				.populate('user', 'id name')
				.sort(sort);
			res.status(200).json(orders);
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Completed') {
		try {
			const orders = await Order.find({ status: 'completed' })
				.populate('user', 'id name')
				.sort(sort);
			res.status(200).json(orders);
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	}

	try {
		const orders = await Order.find({}).populate('user', 'id name').sort(sort);
		res.status(200).json(orders);
	} catch (e) {
		res.status(500);
		throw new Error('there was an error');
	}
});

export default getAllOrders;
