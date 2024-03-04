const express = require("express");
const path =require('path');
const session = require('express-session');
const nocache = require('nocache')
const {v4:uuidv4} = require('uuid');
const router = require('./router');

//create an express application
const app = express();
const port =  3000;

//middlware setup
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(nocache());

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets'))); //img

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));


app.use('/route',router)

//home.route
app.get("/", (req, res) => {
    if(req.session.user){

        res.redirect("/route/dashboard")
    }else{
    res.render('base', {title:"Login System"})

    }
})

app.listen(port,() => {console.log("Lostening to the server on http://localhost:3000 ")});