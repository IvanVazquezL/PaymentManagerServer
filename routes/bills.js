import { Router } from 'express';
import validateFields from '../middlewares/validate-fields.js';
import validateJWT from '../middlewares/validate-jwt.js';
import { createBill, getBills } from '../controllers/bill.js';

const router = Router();

router.get( '/', validateJWT, getBills);
//router.get( '/:id', validateJWT, getBillById);

router.post( '/',
    validateJWT,
    createBill
);

export default router;