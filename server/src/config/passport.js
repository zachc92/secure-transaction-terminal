import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcryptjs';
import * as db from '../db/queries.js';

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await db.getUser(username);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await db.getUserById(id);
        const user = rows[0];

        if (user) delete user.password;

        done(null, user);
    } catch(error) {
        done(error);
    }
});

export default passport;