import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

const addNewOrder = asyncHandler(async (req, res) => {
	const { orderItems } = req.body;

	console.log(req.body);

	if (orderItems && orderItems.length === 0) {
		return res.status(400).json('no order items');
	} else {
		const order = new Order({
			orderItems: req.body.orderItems,
			user: req.user._id,
			shippingAddress: req.body.shippingAddress,
			paymentMethod: req.body.paymentMethod,
			itemsPrice: req.body.itemsPrice,
			vat: req.body.vat,
			shippingPrice: req.body.shippingPrice,
			totalPrice: req.body.totalPrice,
		});
		try {
			const createdOrder = await order.save();
			res.status(201).json(createdOrder);
		} catch (e) {
			res.status(500).json({ msg: e.message });
		}
	}
});

export default addNewOrder;
