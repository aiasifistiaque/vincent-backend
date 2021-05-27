import express from 'express';
import getSingleOrder from '../controller/order/getSIngleOrder.js';
import getAllOrders from '../controller/order/getAllOrders.js';
import addNewOrder from '../controller/order/addNewOrder.js';
import getUserOrders from '../controller/order/getUserOrders.js';
import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, admin, getAllOrders).post(protect, addNewOrder);

router.get('/:id', getSingleOrder);

router.post('/userorder', protect, getUserOrders);

router.post('/getallorders', protect, admin, getAllOrders);

export default router;
