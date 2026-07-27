import bcrypt from 'bcryptjs';
import pool from '../db/db.js';

export const handleUserSignup = async (req, res) => {
    console.log(req.body);
    res.send('this is the response');
};