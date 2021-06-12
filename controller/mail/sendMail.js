import nodemailer from 'nodemailer';

const sendMail = order => {
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
			to: 'asifistiaque.ai@gmail.com',
			subject: `Vincent's Sphere Order Summary (Order #${order._id})`,
			text: 'Order placed Successfully',
			html: `<div>
					<h5 style="margin:0px;">Vincent's Sphere Order Summary</h5>
					<h6 style="margin:0px;font-weight:400;">Date: ${date}</h6>
					<hr/>
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

const getUnixToDate = unix => {
	const date = new Date(unix);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const time = unixToHourMin(unix);

	date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	return `${getNumberToMonth(month)} ${day}, ${year} ${time}`;
};

const unixToHourMin = unix => {
	const date = new Date(unix);
	const hour = date.getHours();
	const seconds = date.getSeconds();
	let sec = seconds;
	if (seconds < 10) {
		sec = `0${sec}`;
	}
	const min =
		date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	if (hour == 0) return '12:' + min + ':' + sec + ' AM';
	if (hour == 12) return '12:' + min + ':' + sec + ' PM';
	if (hour < 12) {
		if (hour < 10) return `0${hour}:${min}:${sec} AM`;
		else return `${hour}:${min}:${sec}  AM`;
	}
	if (hour > 12) {
		let hh = hour - 12;
		if (hh < 10) return `0${hh}:${min}:${sec}  PM`;
		else return `${hh}:${min}:${sec}  PM`;
	}
};

const getNumberToMonth = month => {
	switch (month.toString()) {
		case '0':
			return 'Jan';
		case '1':
			return 'Feb';
		case '2':
			return 'Mar';
		case '3':
			return 'Apr';
		case '4':
			return 'May';
		case '5':
			return 'Jun';
		case '6':
			return 'Jul';
		case '7':
			return 'Aug';
		case '8':
			return 'Sep';
		case '9':
			return 'Oct';
		case '10':
			return 'Nov';
		case '11':
			return 'Dec';
	}
};

export default sendMail;
