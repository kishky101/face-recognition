const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


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

app.use(cors())

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'john',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'banana',
//             entries: 0,
//             joined: new Date()
//         },
//     ]
// }

// app.get('/', (req, res) => {
//     res.send(database.users)
// })

app.post('/signin', (req, res) => {

    db('users').select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                    .where({email: req.body.email})
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'));
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    var hash = bcrypt.hashSync(password);

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users').returning('*').insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })

        .catch(err => res.status(400).json('unable to register user'))
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    db.select('*').from('users').where({'id': id})
        .then(user => {
            if(user.length) {
                res.json(user[0]);
            }else {
                res.status(400).json('Not found');
            }

        }).catch(err => res.status(400).json('Not found'))
})

app.put('/image', (req, res) => {
    const {id} = req.body;

    db('users').where({id: id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'))

})

app.listen(3000, () => console.log('app is running on port 3000'))


/* 
/ --> res = this is working
/signIn --> POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> put = user
*/