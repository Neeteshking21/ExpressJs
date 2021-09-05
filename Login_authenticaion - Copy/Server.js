const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user.js')

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
     res.json({status: 'ok'});
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});