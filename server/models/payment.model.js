const mongoose = require('mongoose');

const payment = mongoose.Schema({
    
    name: String,
   quantity:Number,
   price:Number
    
   

    
   
})

module.exports = mongoose.model('payment',payment)