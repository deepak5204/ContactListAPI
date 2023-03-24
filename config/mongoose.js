const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // database save only defined schema data

mongoose.connect('mongodb://127.0.0.1:27017/contactList')
  .then(()=>{
    console.log('Connected!')
  });