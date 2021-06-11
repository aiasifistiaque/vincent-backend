import nodemailer from 'nodemailer';

const sendMail = order => {
	console.log(order);
	let quantity = 0;
	order.orderItems.map(x => (quantity = quantity + x.qty));
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

	try {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'thinkcrypt@gmail.com',
				pass: '01828398225',
			},
		});

		var mailOptions = {
			from: 'thinkcrypt@gmail.com',
			to: 'asifistiaque.ai@gmail.com',
			subject: 'New Order Placed',
			text: JSON.stringify(order),
			html: `<div>
					<h3>Order Summary</h3>
                    <h5>Order no: ${order._id}</h5>
                    <hr/>
                    <h5>Customer id: ${order.user._id}</h5>
                    <p>Name: ${order.user.name}</p>
                    <p>Email: ${order.user.email}</p>
                    <h4>Phone: ${order.shippingAddress.phone}</h4>
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

export default sendMail;
