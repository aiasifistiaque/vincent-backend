import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const changeOrderSeen = asyncHandler(async (req, res) => {
	const { id, seen } = req.body;

	try {
		const order = await Order.findById(id).populate('user', 'id name email');
		console.log(order);
		order.seen = seen;
		const saveOrder = await order.save();
		console.log(saveOrder);
		res.status(200).json({ success: true });
	} catch (e) {
		console.log(e);
		res.status(500).json({ success: false });
	}
});

export default changeOrderSeen;
