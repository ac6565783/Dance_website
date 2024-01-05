const express = require("express")
const path = require("path")
const app = express();
const dotenv = require('dotenv')
var mongoose = require("mongoose")
const connectDB = require('./config/db');
const bodyParser = require("body-parser");

//config dotenv
dotenv.config();

//port
const port = process.env.PORT || 8000;

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
})
var Contact = mongoose.model('Contact', contactSchema)
//express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine', 'pug')//set the templete engine
app.set('views', path.join(__dirname, 'views'))//set the directory

//endpoints
app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('home.pug', param);
})

app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param);
})
app.get('/about', (req, res) => {
    const param = {}
    res.status(200).render('about.pug', param);
})
app.get('/services', (req, res) => {
    const param = {}
    res.status(200).render('services.pug', param);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).send("Detail has been saved to database")
    }).catch(() => {
        res.status(400).send("Detail was not saved to the database")
    });
})


//mongodb connection
connectDB();

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})