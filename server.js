import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js'
import handleProfileGet from './controllers/profile.js'
import {handleImage, handleApiCall} from './controllers/image.js'




const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user: 'postgres',
      password: 'admin',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express();
app.use(express.json())
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries:0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    // res.send('this is working')
    // res.send(database.users)
    db.select('*').from('users').then(data => {
        res.send(data)
    })
})

app.post('/signin', (req,res) => {handleSignIn(req,res,db,bcrypt)})

app.post('/register', (req,res) => {handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {handleProfileGet(req,res,db,bcrypt)})

app.put('/image',(req,res) => {handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {handleApiCall(req,res)})


// bcrypt.hash("bacon",null,null,function(err,hash) {

// });

// bcrypt.compare("bacon", hash, function(err,res) {

// });
// bcrypt.compare("veggies", hash, function(err,res) {

// });



app.listen(3000, () =>{
    console.log('app is running on port 3000')
    // console.log(`app is running on port ${process.env.PORT}`)
    // console.log(process.env)
})

