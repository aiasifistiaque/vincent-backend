import nodemailer from 'nodemailer';
import getUnixToDate from '../../functions/unixToDate.js';

const sendMailToCustomer = order => {
	console.log(order);
	let quantity = 0;
	order.orderItems.map(x => (quantity = quantity + x.qty));
	const date = getUnixToDate(order.createdAt);
	const items = order.orderItems.map(
		(x, i) =>
			`<div>
            <h5>
            [${i + 1}] 
				<u>${x.product}</u>
			</h5>
			<p>
				 <strong>${x.name}</strong>, ৳${x.price / x.qty}x${x.qty} = ৳${x.price}
			</p>
		</div>`
	);

	const from = `Vincent's Sphere <support@vincentsphere.com>`;

	try {
		var transporter = nodemailer.createTransport({
			host: 'mail.privateemail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'support@vincentsphere.com',
				pass: 'vincentsphere',
			},
		});

		var mailOptions = {
			from: from,
			to: order.user.email,
			subject: `Vincent's Sphere Order Summary (Order #${order._id})`,
			text: 'Order placed Successfully',
			html: `<div>
					<h5 style="margin:0px;">Vincent's Sphere Order Summary</h5>
					<h6 style="margin:0px;font-weight:400;">Date: ${date}</h6>
                    <hr/>
                    <p style="margin:0px;">Dear ${order.user.name},</p>
                    <p style="margin:0px;">Thank you for choosing Vincent’s Sphere. Here’s a summary of your order.</p>
                    <h5 style="margin-bottom:5px">Customer #${order.user._id}</h5>
                    <p style="margin:0px;">Name: ${order.user.name}</p>
                    <p style="margin:0px;">Email: ${order.user.email}</p>
                    <h4 style="margin-top:5px;">Phone: ${order.shippingAddress.phone}</h4>
					<hr/>
					<h3>Delivery Details</h3>
					<p>
						Address: ${order.shippingAddress.address},
						${order.shippingAddress.city} ${order.shippingAddress.postalCode}
					</p>
					<h4>Payment Method: ${order.paymentMethod}</h4>
				    <hr/>
					<h3>Items</h3>
                    <div>${items}</div>
                    <hr/>
                    <p><strong>Items: ${quantity}</strong></p>
                    <p><strong>Sub Total: ৳${order.totalPrice}</strong></p>
                    <br/>
                    <p style="margin:0px;">If you have any queries about this order, You can contact us:</p>
                    <p style="margin:0px;">Phone: 01312-795919</p>
                    <p style="margin:0px;">Email: support@vincentsphere.com</p>
				</div>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export default sendMailToCustomer;
