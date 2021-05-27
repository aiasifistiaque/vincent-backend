import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({}).populate('user', 'id name');
		res.status(200).json(orders);
	} catch (e) {
		res.status(404).json({ msg: e.message });
	}
});

export default getAllOrders;
