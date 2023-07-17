import { response } from 'express';
import pkg from 'bcryptjs';
const { compareSync } = pkg;
import { generateJWT } from '../helpers/jwt.js';
import User from '../models/user.js';

export const login = async( req, res = response ) => {
    const { username, password } = req.body;

    try {
        const userDB = await User.findOne({ username });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'username not found'
            });
        }

        const validPassword = compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            });
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Login failed'
        });
    }
}

export const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generateJWT( uid );
    const user = await User.findById( uid );

    res.json({
        ok: true,
        token,
        user
    });
}