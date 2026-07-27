import express from 'express';
import session from 'express-session';
import path from 'node:path';
import pkg from 'pg';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { indexRouter } from './routes/indexRouter.js';

const { Pool } = pkg;

const pool = new Pool({
    connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:${process.env.DBPORT}/${process.env.DBNAME}`
});

// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//         try {
//             const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//             const user = rows[0];

//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username' });
//             }
//             const match = await bcrypt.compare(password, user.password)
//             if (!match) {
//                 return done(null, false, { message: 'Incorrect password' });
//             }
//             return done(null, user);
//         } catch(error) {
//             return done(error);
//         }
//     })
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//         const user = rows[0];

//         done(null, user);
//     } catch(error) {
//         done(error);
//     }
// });

const app = express();

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     next();
// });

app.use('/', indexRouter);

app.listen(3000, err => {
    if(err) throw err;
    console.log(`Server lisening on port 3000`);
})