import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getUserOrders = asyncHandler(async (req, res) => {
	//console.log(req);
	try {
		const orders = await Order.find({ user: req.user._id }).populate(
			'user',
			'id name'
		);
		res.status(200).json(orders);
	} catch (e) {
		res.status(404).json({ msg: e.message });
	}
});

export default getUserOrders;
