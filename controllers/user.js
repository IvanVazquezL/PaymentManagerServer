import { response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateJWT } from '../helpers/jwt.js';

export const createUser = async(req, res = response) => {
    const { username, password } = req.body;

    try {
        const usernameExists = await User.findOne({ username });

        if ( usernameExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'username is already registered'
            });
        }

        const user = new User( req.body );
    
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        // Save user
        await user.save();

        // Generate token
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    }
}

export const getUserById = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with that id'
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error getting user by id'
        })
    }
}