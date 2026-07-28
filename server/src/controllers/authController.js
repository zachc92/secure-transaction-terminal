import bcrypt from 'bcryptjs';
import * as db from '../db/queries.js';
import passport from 'passport';

export const handleUserSignup = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if(!username || !password || !role){
            return res.status(400).json({ error: 'Required parameters are username, password, and role' });
        }

        if(password.length < 8){
            return res.status(400).json({ error: 'Password must be at least 8 characters.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = await db.addUser(username, hashedPassword, role);

        return res.status(201).json({
            success: true,
            message: 'Employee profile created successfully.',
            userId: id.rows[0].id
        })

    } catch(error){
        // psql throws error code 23505 is the "unique violation" error code. Our unique rule for usernames allows psql to catch duplicates before they are created.
        if(error.code === '23505'){
            return res.status(409).json({ error: 'Username already exists.' });
        }
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const handleUserLogin = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if(error){
            return res.status(500).json({ error: "Internal authentication error." });
        }
        if(!user){
            return res.status(401).json({ success: false, error: info.message || 'Unauthorized.' });
        }

        req.logIn(user, (loginError) => {
            if (loginError) {
                return res.status(500).json({ error: "Session establishment failure." });
            }

            return res.status(200).json({
                success: true,
                message: "Authentication successful.",
                user: { id: user.id, username: user.username, role: user.role }
            });
        });
    })(req, res, next);
};

export const handleUserLogout = (req, res, next) => {
    req.logout((error) => {
        if(error){
            return next(error);
        }
        
        req.session.destroy((destroyError) => {
            if(destroyError){
                return res.status(500).json({ error: 'Logout failed.' })
            }

            res.clearCookie('connect.sid');
            return res.status(200).json({
                success: true,
                message: 'Successfully logged out.'
            });
        });
    });
};

export const getUsers = async (req, res) => {
    const users = await db.getUsers();
    res.send(users);
}