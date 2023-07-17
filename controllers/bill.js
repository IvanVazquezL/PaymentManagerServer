import { response } from 'express';
import Bill from '../models/bill.js';

export const createBill = async( req, res = response ) => {
    try {
        //  TODO: Si ya existe no se vuelve a crear
        const bill = new Bill( req.body );
        const billDB = await bill.save();

        res.json({
            ok: true,
            bill: billDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating bill'
        });
    }
}

export const getBills = async( req, res = response ) => {
    try {
        const bills = await Bill.find({}, '');
        res.json({
            ok: true,
            bills
        });
    } catch (error) {
        console.log(error);
    }
}
