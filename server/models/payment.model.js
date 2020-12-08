const mongoose = require('mongoose');

const payment = mongoose.Schema({
    
    name: String,
   quantity:Number,
   price:Number,
   socialId:Number,
   fullname:String
    
   

    
   
})

module.exports = mongoose.model('payment',payment)