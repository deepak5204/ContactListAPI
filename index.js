const express = require("express");

const app = express();// here express make executable
const port = 8008;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

app.post('/create-contact', function(req, res){

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })
    console.log('hello contact', req.body.name);
    res.end();
})

app.listen(port, (err) =>{
 if(err){
    console.log(err,"server error");
 }

 console.log(`server is running on port, ${port}`);
 
});