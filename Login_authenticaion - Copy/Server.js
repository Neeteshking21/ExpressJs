const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const User = require('./models/user.js')
const async = require('hbs/lib/async')


const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.json())

app.post('/api/register', async (req, res) => {
    
    console.log(req.body)
    const {email, pass} = req.body
    const encryptPass = await bcrypt.hash(pass, 10)

    try{
        const response = await User.create({
            email:email,
            password:encryptPass
        })
        console.log(`User created successfully ${response}`)
    }
    catch(error){
        console.log(error.code)
        if(error.code){
            console.log("Email already in use")
            return  res.json({status: 1100, error: 'Email already in use'});
        }
    }

    console.log(encryptPass)
    res.json({status: 'ok'});
    // Analysts
    // Scripts for reading databases
    //OPEN API access to your database

    // Hasing the password
    // bcrypt, md5, shal, sha256, sha512.....

    //1. The collision should be importable
    // 2. the algorithm should be slow 


     
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});