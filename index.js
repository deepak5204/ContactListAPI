const express = require("express");

const app = express();// here express make executable
app.use(express.json()); //take input from body (postman)
const port = 8008;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

//post route
app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(error, newContact){
        if(error){
            console.log('error in crate contatct list');
            return;
        } 
        console.log('new contact ', newContact);
        return newContact;
    });
    // console.log('hello contact', req.body.name);
    // console.log('Phone', req.body.phone);
    res.end();
});

//get routes
app.get('/get-contact', function(req, res){
    const user = Contact.find({}, function(err, contacts){
        if(err){
            console.log('contact not found.');
            return;
        }

        console.log(user);
        // console.log(contacts);
        return res.contacts;
    });
    res.end();
});


//delete route
app.get('delete-contact', function(req, res){
    let id = re.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in delete contact');
            return;
        }
        console.log(id);
        
        return res;
    });
});

app.listen(port, (err) =>{
 if(err){
    console.log(err,"server error");
 }

 console.log(`server is running on port, ${port}`);
 
});