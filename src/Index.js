const express = require('express')
const path = require('path')
const PORT = 8000
const app = express()

console.log(path.join(__dirname, '../public/Index.html'))
const staticpath = path.join(__dirname, '../public')
app.use(express.static(staticpath))

app.get('/f', (req, res)=>{
    res.send('jl')
})

app.get('/home', (req, res)=>{
    res.send('hello from Express')
    console.log('<h1>Home page</h1>')
})

app.get('/about', (req, res)=>{

    /* If we use res.write than we have to end it using res.send otherWise brower process will be underGoing */
    // res.write("<h1>About Page</h1><h3>Helo this is Neetesh Kumar Shrama</h3>")
    res.json([{
        id:10,
        name:"Neetesh"
    }])
    res.send()
})
app.get("", (req, res)=>{
    res.write("<h1>Error Page</h1>")
    res.send()
})


app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))