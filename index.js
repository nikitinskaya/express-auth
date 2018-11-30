const express = require('express');
const { get } = require ('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

let items;
const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
};

passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT || PORT}/login/facebook/return`
    },function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({ secret: 'mysecret', resave: true, saveUninitialized: true}))
    .use(passport.initialize())
    .use(passport.session())
    .get('/', r => r.res.render('author'))
    .get(/author/, r => r.res.set(CORS).send('Вера Никитинская'))
    .get(/hello/, r => r.res.end('Hello World'))
    .get('/login', r => r.res.render('login'))
    .get('/login/facebook', passport.authenticate('facebook'))
    .get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/users');
        })
    .get(/logout/, (req, res) => {
        req.logout();
        res.redirect('/');
    })
    .get(/users/, async (req, res) => {
        if (req.isAuthenticated()) {
            res.render('list', { title: 'Login list', items });
        } else {
            res.redirect('/login');
        }
    })
    .use(r => r.res.status(404).end('Not here, sorry'))
    .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
    .set('view engine', 'pug')
    .listen(process.env.PORT || PORT, async () => {
    console.log(`Start process ${process.pid}`);
    ({ data: { users: items }} = await get(URL));
});
