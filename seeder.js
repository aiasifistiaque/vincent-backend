import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { productData } from './data/productData.js';
import Product from './models/productModel.js';
import connectDB from './db.js';
import colors from 'colors';

dotenv.config();
connectDB();

const importData = async () => {
	try {
		//await Order.deleteMany();
		await Product.deleteMany();

		const sampleProducts = productData.map(product => {
			return { ...product, user: '60ae538719a9df4204e329f5' };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

importData();
