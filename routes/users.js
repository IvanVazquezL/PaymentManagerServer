import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields.js';
import validateJWT from '../middlewares/validate-jwt.js';
import { createUser, getUserById } from '../controllers/user.js';

const router = Router();

router.get( '/:id', validateJWT, getUserById);

router.post( '/',
    [
        check('password', 'Password is mandatory').not().isEmpty(),
        check('username', 'Username is mandatory').not().isEmpty(),
        validateFields,
    ], 
    createUser 
);

export default router;