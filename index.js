const express = require("express");

const app = express();// here express make executable
app.use(express.json()); //take input from body (postman)
const port = 8008;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

//post route for create contact
app.post('/create_contact', async (req, res) => {
    try{
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
           res.status(200).json({
                message :"Success",
                data : {
                    newContact
                }
            });
    } catch (err){
        console.log(err); 
    }
    });



//get routes
app.get('/get-contact', (req, res) => {
     Contact.find({}, (err, contacts) => {
        if(err){
            console.log('contact not found.');
            return;
        }
        return res.json({
            message :"Contact created",
            data : contacts
        });
    });
});


//delete route (using query params)
app.delete('/:id/delete-contact', async (req, res) => {
  try{
    let id = req.params.id;
    console.log(id);

     const deletedContact = await Contact.findByIdAndDelete(id);
    res.status(200).json({
        message:'success',
        data: {
            deletedContact
        }
    })
  } catch (err) {
    console.log(err);
    
  }
});


//update Route (using simple params)
app.patch('/:id/update', async (req, res) => {
    try{
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
            req.body,{
                new: true
            });
        res.status(200).json({
        message: 'success',
        data: {
            updatedContact
        }
    });

    } catch (err) {
        console.log(err);
        
    }
    });



app.listen(port, (err) =>{
 if(err){
    console.log(err,"server error");
 }

 console.log(`server is running on port, ${port}`);
 
});