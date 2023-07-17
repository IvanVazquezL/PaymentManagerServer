/*
    Path: '/api/login'
*/
import { Router } from 'express';
import { login, renewToken } from '../controllers/auth.js';
import validateFields from '../middlewares/validate-fields.js';
import validateJWT from '../middlewares/validate-jwt.js';

const router = Router();

router.post( '/', 
    [
        validateFields
    ],
    login
);

router.get( '/renew',
    validateJWT,
    renewToken
)

export default router;
 
