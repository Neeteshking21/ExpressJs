const express = require('express')
const path = require('path')
const hbs = require('hbs')
const PORT = 8000
const app = express()

/* This is for static website 
const staticpath = path.join(__dirname, '../public')
app.use(express.static(staticpath))
*/
// build in middleware
const staticpath = path.join(__dirname, '../public')
const templetePath = path.join(__dirname, '../templetes/views')
const partials = path.join(__dirname, '../templetes/partials')

hbs.registerPartials(partials)
// For Dynamic website using Handlebars templete Engine
app.set('view engine', "hbs")
app.set('views', templetePath)

app.get('/', (req, res)=>{
    res.render('Index', {name:'Neetesh'}) // set dynamic content
})

app.get('/home', (req, res)=>{
    res.send('hello from Express')
    console.log('<h1>Home page</h1>')
})

app.get('/about', (req, res)=>{
    res.send("About page")
})
app.get('*', (req, res)=>{
    res.render("404", {
        err:"Opps page not Found"
    })
})
    /* If we use res.write than we have to end it using res.send otherWise brower process will be underGoing */
    // res.write("<h1>About Page</h1><h3>Helo this is Neetesh Kumar Shrama</h3>")
    // res.json([{
    //     id:10,
    //     name:"Neetesh"
    // }])
    // res.send()


app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))