import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const editOrder = asyncHandler(async (req, res) => {
	const { id, status, paid } = req.body;

	try {
		const order = await Order.findById(id);
		order.status = status;
		order.isPaid = paid;
		const saveOrder = await order.save();
		res.status(200).json(saveOrder);
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: e.message });
	}
});

export default editOrder;
