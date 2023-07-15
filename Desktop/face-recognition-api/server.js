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
      host : 'dpg-cipammmnqql4qa72jhmg-a',
      port : 5432,
      user : 'face_recognition_database_k1b5_user',
      password : 'NGWxEWs7dMbXyi8J8P2cBebHOrqg1FiB',
      database : 'face_recognition_database_k1b5'
    }
})

//db .select('id').from('users').then(data => console.log(data));

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.json('It is working'));

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