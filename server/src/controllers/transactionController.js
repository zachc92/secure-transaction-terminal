import * as db from '../db/queries.js';

export const addTransaction = async (req, res) => {
    res.send({ user: req.user, message: 'Adding transaction...' });
};