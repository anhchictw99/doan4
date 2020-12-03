const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = mongoose.Schema({
    username: String,
    password: String,
    socialId:{
        type:Number,default:undefined

    },
    role:{
        type:String, default:"user"
    },
    will:{
        type:String , default:"test"
    },
    state:{
        type:String,default:"no"
    },
    email:{
        type:String
    },
    phone:{
        type:Number, default:0123
    },
    address:{
        type:String
    },
    fullname:{
        type:String
    },
    random: {type:Number},
    relative:{
        name:{
            type:String
        },
        role:{
            type:String,
            default:'relative'
        },
        socialId:{
            type:Number
        },
        email:{
            type:String
        },
        phone:{
            type:Number
        },
        question1: {
            type:String
        },
        question2: {
            type:String
        },
        question3: {
            type:String
        },
        month:{
            type:String
        }
  
        
    },
    last_login_date: {
        type: Date,
        //default: Date.now
    },
    resetLink:{
        type:String
    }
});
user.statics.login = function(){
    return this.findByIdAndUpdate('req.userData.userId', { $set : { 'last_login_date' : Date.now()},new: true},function(err,docs){
        if(err){
            res.status(401).json({mess:'fail'})
        }else{
            res.status(201).json({mess:docs})
        }
    });//
 };
user.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
          return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
   } 
});
// user.pre("updateOne",{document:true} ,async function(next) {
//     try {
//         if (!this.isModified("password")) {
//           return next();
//         }
//         let hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//         return next();
//     } catch (err) {
//         return next(err);
//    } 
// });

module.exports = mongoose.model('user',user)