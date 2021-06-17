import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const getSingleOrder = asyncHandler(async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			'user',
			'id name email'
		);

		if (req.user.role != 'admin' && order.user._id != req.user._id) {
			return res.status(401).send('Unauthoized');
		}

		res.status(200).json(order);
	} catch (e) {
		res.status(404).json({ msg: e.message });
	}
});

export default getSingleOrder;
