import express from 'express';
const router = express.Router();
import { getPieChart } from '../controllers/pieChartController.js';

router.route('/').get(getPieChart);

export default router;
