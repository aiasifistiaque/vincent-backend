import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';
import sendMail from '../mail/sendMail.js';
import sendMailToCustomer from '../mail/sendMailToCustomer.js';
import Product from '../../models/productModel.js';

const addNewOrder = asyncHandler(async (req, res) => {
	const { orderItems } = req.body;

	console.log(req.body);

	//console.log(req.body);

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

		orderItems.map(async item => {
			try {
				const prod = await Product.findById(item.product);
				prod.countInStock = prod.countInStock - item.qty;
				await prod.save();
			} catch (e) {
				console.log(e);
			}
		});

		try {
			const createdOrder = await order.save();
			const findOrder = await Order.findById(createdOrder._id).populate(
				'user',
				'id name email'
			);
			sendMail(findOrder);
			sendMailToCustomer(findOrder);
			//sconsole.log(findOrder);
			res.status(201).json(createdOrder);
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: e.message });
		}
	}
});

export default addNewOrder;
