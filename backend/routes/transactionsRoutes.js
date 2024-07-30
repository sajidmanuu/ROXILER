import express from 'express';
const router = express.Router();
import { getTransactions } from '../controllers/transactionsController.js';

router.route('/').get(getTransactions);

export default router;
