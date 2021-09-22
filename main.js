const express = require('express');


const app = express();
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./classRoutes');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
// app.use(bodyParser.json()))
app.use('/', routes);
app.get('/',(req, res) =>{
    
        res.send("hello there");
        console.log("hello");
})

const userInfo = require('./userDB')
const adminInfo = require('./adminDB')







app.listen(3000, function (){
    console.log("PORT 3000 LISTENING!!!!");
})
