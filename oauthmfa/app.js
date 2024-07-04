require('dotenv').config();
const passport = require('passport');
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.GOOGLE_CALLBACK_URL);
console.log(process.env.SESSION_SECRET);
const express = require('express');
const session = require('express-session');
require('./auth');

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('<a href="/auth/google"> Auth with Google </a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', { 
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
     })
);

app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong');
});

app.get('/logout', (req, res) => {
    res.logout();
    req.session.destroy();
    res.send('Goodbye');
});


app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello  ${req.user.displayName}` );
    console.log(req.user);
});
app.listen(5000, () => console.log('Listening on: 5000'));

