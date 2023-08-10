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
            msg: 'Error creating bill',
            error: JSON.stringify(error),
        });
    }
}

export const getBillById = async(req, res = response) => {
    const id  = req.params.id;

    try {
        const bill = await Bill.findById( id );
        res.json({
            ok: true,
            bill
        });
    } catch (error) {
        console.log(error);
    }
}

export const getBillsByUserId = async( req, res = response ) => {
    const id  = req.params.id;

    try {
        const bills = await Bill.find({ userId: id }, '');
        res.json({
            ok: true,
            bills
        });
    } catch (error) {
        console.log(error);
    }
}
