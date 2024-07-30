import express from 'express';
const router = express.Router();
import { getBarChart } from '../controllers/barChartController.js';

router.route('/').get(getBarChart);

export default router;
