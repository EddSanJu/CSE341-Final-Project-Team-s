const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/db');
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const { createDbUser } = require('./controllers/UsersControllers')
// const connectDB = require('./db/db');

const app = express();
// Convert a request (POST,GET) to JSON Object
app.use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, z-key')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next();
    });

app.use('/', require('./routes'));

passport.use(new GithubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        //console.log(profile)

        const user = {
            gitHubUser: profile._json.login,
            name: profile._json.name,
            email: profile._json.email,
            userImg: profile._json.avatar_url,
            company: profile._json.company,
            location: profile._json.location,
            bio: profile._json.bio
        }
        createDbUser(user).then(response => {
            return done(null, { ...profile, id: response.insertedId })
        })
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/github/callback', passport.authenticate('github',
    {
        failureRedirect: '/api-docs/',
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
});
