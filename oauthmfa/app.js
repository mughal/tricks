require('dotenv').config();
const passport = require('passport');
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.GOOGLE_CALLBACK_URL);
const express = require('express');
require('./auth');

const app = express();
app.get('/', (req, res) => {
    res.send('<a href="/auth/google"> Auth with Google </a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/protected', (req, res) => {
    res.send('Hello');
});
app.listen(5000, () => console.log('Listening on: 5000'));

