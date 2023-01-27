const express = require("express");

const app = express();// here express make executable
app.use(express.json()); //take input from body (postman)
const port = 8008;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

//post route for create coontact
app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(error, newContact){
        if(error){
            console.log('error in crate contatct list');
            return;
        }
        return res.json({
            message :"Contact created",
            data : newContact
        });
    });
});



//get routes
app.get('/get-contact', function(req, res){
     Contact.find({}, function(err, contacts){
        if(err){
            console.log('contact not found.');
            return;
        }
        return res.json({
            message :"Contact created",
            data : contacts
        });
    });
    // res.end();
});


//delete route
app.post('/delete-contact', function(req, res){
    let id = req.body.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in delete contact');
            return;
        }
        return res.json({message :"Contact deleted successfully"})
    });
});


//update Route
app.put('/update-contact', function(req, res){
    const id = req.params.id;
    console.log(req.params.id);
    Contact.findOneAndUpdate(id, {
        $set:{
            name: req.body.name,
           
            phone: req.body.phone
        }
    });
    return res.send({message :"Contact updated"});
    // res.end();
});

app.listen(port, (err) =>{
 if(err){
    console.log(err,"server error");
 }

 console.log(`server is running on port, ${port}`);
 
});