const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'ldhhfhuagfuO3b254b784kln6l4blb63h4bil%&*^^!fjso09vhiby8ybq2vc&#Pd#*&#@^&&*ufwi8fioshiohb9yybc9vyv8y90yh0yp'
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/login', express.static(path.join(__dirname, 'static/Login.html')))
app.use('/change-password', express.static(path.join(__dirname, 'static/change-password.html')))
app.use(express.json())

app.post('/api/register', async (req, res) => {
    
    if(!validator.isEmail(req.body.email))
         return res.json({status: 'error', error: 'Please Enter Valid Email'})
    else if(!validator.isStrongPassword( req.body.pass ,{
            minLength: 8, minLowercase: 1, minUppercase: 1, 
            minNumbers: 1, minSymbols: 1, returnScore: false }
        ))
        return res.json({status: 'error', error: 'Password must contain 1   Lowercase, 1 Uppercase 1 number, 1 symbol and minimum length is 8'});

    else{
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
        res.json({status: 'ok'});
    }
    
    // Analysts
    // Scripts for reading databases
    //OPEN API access to your database

    // Hasing the password
    // bcrypt, md5, shal, sha256, sha512.....

    //1. The collision should be importable
    // 2. the algorithm should be slow 


     
});

app.post('/api/login', async (req, res)=>{

    const { email, pass } = req.body
    
    if(!validator.isEmail(email))
       return res.json({status:'error', error:'Enter Valid Email'})
    else if(pass.length <=0)
       return res.json({status:'error', error:'Enter password'})
    
    else{
        const user = await User.findOne({email}).lean()
        
        if(user==null){
            console.log('am i Here')
            return res.json({status:'error', data:'Invalid Username or password'})
           
        }
        console.log(user.password)
        if( await bcrypt.compare(pass, user.password)){
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, JWT_SECRET)
            return res.json({status:'ok', data:token})
        }

        return res.json({status: 'error', data:'Invalid Username or password'})  
    }   
})

app.post('/api/change-password', (req, res)=>{
    // console.log(req.body)
    // const { token } = req.body
    //  console.log('Your token is : -    '+token)
        
    // const veryfy = jwt.verify(token, JWT_SECRET)
    // console.log(veryfy)
    return  res.json({status: 'Ok'});
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});