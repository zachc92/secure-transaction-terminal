import express from 'express';
import session from 'express-session';
import path from 'node:path';
import passport from './src/config/passport.js';
// import { Strategy as LocalStrategy } from 'passport-local';

import { indexRouter } from './src/routes/indexRouter.js';
import { authRouter } from './src/routes/authRouter.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false, cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', authRouter);

app.listen(3000, err => {
    if(err) throw err;
    console.log(`Server lisening on port 3000`);
})