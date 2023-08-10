import { Router } from 'express';
import validateFields from '../middlewares/validate-fields.js';
import validateJWT from '../middlewares/validate-jwt.js';
import { createBill, getBillById, getBillsByUserId } from '../controllers/bill.js';

const router = Router();

router.get( '/user/:id', validateJWT, getBillsByUserId);
router.get( '/:id', validateJWT, getBillById);
router.post( '/', validateJWT, createBill);

export default router;