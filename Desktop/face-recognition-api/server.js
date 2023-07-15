const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'kishky123',
      database : 'facerecognition'
    }
})

//db .select('id').from('users').then(data => console.log(data));

const app = express();

app.use(express.json());

app.use(cors());


app.post('/signin', (req, res) => signIn.handleSignIn(req, res, bcrypt, db));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => console.log('app is running on port 3000'));


/* 
/ --> res = this is working
/signIn --> POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> put = user
*/