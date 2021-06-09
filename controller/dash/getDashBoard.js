import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';
import { User } from '../../models/userModel.js';
import Product from '../../models/productModel.js';

const getDashBoard = asyncHandler(async (req, res) => {
	const options = req.body.option;
	if (options == 'all orders') {
		try {
			const count = await Order.count();
			res.status(200).json({ count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (options == 'completed orders') {
		try {
			const count = await Order.find({ status: 'completed' }).select([
				'totalPrice',
				'status',
			]);
			let price = 0;
			const countPrice = count.map(x => (price += x.totalPrice));
			res.status(200).json({ count: count.length, total: price });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (options == 'pending orders') {
		try {
			const count = await Order.find({ status: { $ne: 'completed' } }).select([
				'totalPrice',
				'status',
			]);
			let price = 0;
			const countPrice = count.map(x => (price += x.totalPrice));
			res.status(200).json({ count: count.length, total: price });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (options == 'all users') {
		try {
			const count = await User.count();
			res.status(200).json({ count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (options == 'admin users') {
		try {
			const count = await User.count({ role: 'admin' });
			res.status(200).json({ count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	} else if (options == 'all products') {
		try {
			const count = await Product.count();
			res.status(200).json({ count: count });
		} catch (e) {
			res.status(500);
			throw new Error('there was an error');
		}
	}
});

export default getDashBoard;
