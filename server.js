import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import auth from './routes/authRoute.js';
import users from './routes/usersRoute.js';
import productsRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import morgan from 'morgan';
import colors from 'colors';
import orderRoute from './routes/orderRoute.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import searchRoute from './routes/searchRoute.js';
import exploreRoute from './routes/exploreRoute.js';
import dashRoute from './routes/dashRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import path from 'path';
import reviewRoute from './routes/reviewRoute.js';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

/**Sentry initialization */
Sentry.init({
	dsn:
		'https://9f66bbc636ff442492ad1ffb828e0c99@o866660.ingest.sentry.io/5876859',
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true }),
		// enable Express.js middleware tracing
		new Tracing.Integrations.Express({ app }),
	],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes
app.use('/api/register', users);
app.use('/api/login', auth);
app.use('/api/products', productsRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/profile', userRoute);
app.use('/api/search', searchRoute);
app.use('/api/explore', exploreRoute);
app.use('/api/dashboard', dashRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/review', reviewRoute);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
	// The error id is attached to `res.sentry` to be returned
	// and optionally displayed to the user for support.
	res.statusCode = 500;
	res.end(res.sentry + '\n');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//app.use('/api/payment', gatewayRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
