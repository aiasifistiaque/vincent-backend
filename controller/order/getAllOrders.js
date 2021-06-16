import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getAllOrders = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const option = req.body.sort;
	const perPage = 10;
	const page = req.body.page || 0;

	console.log(req.body.sort);

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
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			return res.status(500);
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
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Archived') {
		try {
			const count = await Order.countDocuments({ status: 'archived' });
			const orders = await Order.find({ status: 'archived' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Cancelled') {
		try {
			const count = await Order.countDocuments({ status: 'cancelled' });
			const orders = await Order.find({ status: 'cancelled' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Shipped') {
		try {
			const count = await Order.countDocuments({ status: 'shipped' });
			const orders = await Order.find({ status: 'shipped' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Confirmed') {
		try {
			const count = await Order.countDocuments({ status: 'confirmed' });
			const orders = await Order.find({ status: 'confirmed' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			console.log(e);
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'Ready For Shipping') {
		try {
			const count = await Order.countDocuments({
				status: 'ready for shipping',
			});
			const orders = await Order.find({ status: 'ready for shipping' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			console.log(e);
			return res.status(500);
			throw new Error('there was an error');
		}
	} else if (option == 'New Orders') {
		try {
			const count = await Order.countDocuments({
				status: 'Order Placed',
			});
			const orders = await Order.find({ status: 'Order Placed' })
				.populate('user', 'id name')
				.sort(sort)
				.skip(page * perPage)
				.limit(perPage);
			return res.status(200).json({ orders: orders, count: count });
		} catch (e) {
			console.log(e);
			return res.status(500);
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
