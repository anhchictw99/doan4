
var express = require('express')
var router = express.Router()
var User = require('../models/user.model')
var Admin = require('../models/admin.model')
var Payment = require('../models/payment.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
var random = require('random');
const nodemailer = require('nodemailer');
var middlewareJwt = require('../middlewares/jwt.middleware')
//twil
const accountSid =process.env.ACCTWI;
const authToken =process.env.TOKENTWI;
const client = require('twilio')(accountSid,authToken);
router.post('/login',(req,res)=>{
    User.findOne({ username: req.body.username })
    
    .then(user =>{
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    {
                      name: user.username,
                      userId: user._id,
                      role: user.role
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                  );
                  return res.status(200).json({
                    message: "Auth successful",
                    token: token
                  });
            }
            else {
              return res.status(401).json({err:'loi'})
            }
        //    return res.status(401).json({
        //       message: "Auth failed"
        //     });
          }); 
    }).catch(err=>{console.log(err);
        res.status(401).json({err:'loi'})
    })
})
// router.post('/register',(req,res)=>{
//     var user = new User({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         phone:req.body.phone,
//         question1:req.body.question1,
//         question2:req.body.question2,
//     })
//     user.save()
    
//     .then(result =>{
//         console.log(result);
//         res.status(201).json({
//             message: "User created"
//           });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
// })
router.post('/createWill',middlewareJwt,(req,res)=>{
    var item = {will:req.body.will}

    // User.updateOne({_id:req.userData.userId},{$set: item},function(err){
    //     if(err){
    //       console.log(err);
    //     return  res.status(401).json({err})
    //     }
              
    //     return  res.status(201).json({message:'success'})
          
    //   })
    User.updateOne({_id:req.userData.userId},{$set: item},function(err){
            if(err){
              console.log(err);
            return  res.status(401).json({err})
            }
                  
            return  res.status(201).json({message:'success'})
              
          })
   
       
})
router.get('/showWill',middlewareJwt,(req,res)=>{
    if(req.userData.role=="user" || req.userData.role=="relative"){
        User.findOne({_id:req.userData.userId})
      .then(result =>{
          console.log(result)
          res.status(201).json({message:result.will})
      })
      .catch(err=>{
          console.log(err)
          res.status(401).json({err})
      })

    }else
    {
        return res.status(401).json({err:'fail'})
    }
      
})
router.delete('/showWill/:id',middlewareJwt,(req,res)=>{
    User.findOneAndDelete({_id:req.params.id},(err)=>{
        if(err){
            console.log(err)
           return res.status(401).json({err})
        }
        return res.status(201).json({message:'success'});
    })
    
})
router.get('/order',middlewareJwt,(req,res)=>{
    if(req.userData.role=="user"){
        User.find({_id:req.userData.userId})
    .then(result=>{
        console.log(result)
        var order = {will: result.will,username:result.username}
        res.status(201).json({order})
    })
    .catch(err=>{console.log(err)
        res.stutus(401).json({err})
    })
    }
    return res.status(401).json({err:'err'})
    
})
router.post('/pay',middlewareJwt,(req,res)=>{
    var state = {state:"yes"}
    var payment = new Payment({
        customer : req.body.customer
    })
    if(req.userData.usrId=='user'){
        payment.save()
    .then(result =>{
        User.updateOne({_id:req.userData.userId},{$set: state},function(err){
            if(err){
                console.log(err);
                res.status(401).json({error:'loi'})
            }
            res.status(201).json({message:result})
    
        })
    })
    }
    return res.status(401).json({err:'err'})
    
})
router.post('/checkEm',(req,res)=>{
    var email = req.body.email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL ,
            pass: process.env.PASSWORD 
        }
    });
    
    // Step 2
    let mailOptions = {
        from: process.env.EMAIL, // TODO: email sender
        to: email, // TODO: email receiver
        subject: 'CODE',
        text: random.int(0, 100).toString()
    };
    
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs');
            return res.status(401).json({mess:'fail'})
            
        }else{
           console.log('thanhcong')
           return res.status(201).json({mess:mailOptions.text})
        }
        
    });
})
//router moi
router.post('/checkEmail',(req,res)=>{
        var email = req.body.email
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL ,
                pass: process.env.PASSWORD 
            }
        });
        
        // Step 2
        let mailOptions = {
            from: process.env.EMAIL, // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'CODE',
            text: random.int(0, 100).toString()
        };
        
        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error occurs');
                return res.status(401).json({mess:'fail'})
                
            }else{
               console.log('thanhcong')
               return res.status(201).json({mess:mailOptions.text})
            }
            
        });
})
router.post('/checkPhone',(req,res)=>{
    var x =random.int(0, 100).toString()
    client.messages.create({
        body:x, 
        from:'+16073604707',
        to: '+84961171425'
    
    })
    .then(kq =>{
        console.log(kq)
        res.status(201).json({mess:x})
        })
    .catch(err=>{
        res.status(401).json({mess:'fail'})
        console.log(err)})
})
router.post('/register',(req,res)=>{
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        socialId:req.body.socialId,
        email: req.body.email,
        phone:req.body.phone,
        

       
    })
    user.save()
    
    .then(result =>{
        const token = jwt.sign(
            {
              name: result.username,
              userId: result._id,
              role: result.role
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})
router.post('/regisRela',middlewareJwt,(req,res)=>{
    var item = {'relative.name':req.body.name,
    'relative.socialId':req.body.socialId,
    'relative.email':req.body.email,
    'relative.phone':req.body.phone,
    'relative.question1':req.body.question1,
    'relative.question2':req.body.question2,
    'relative.question3':req.body.question3,
    'relative.month':req.body.month}
    User.updateOne({_id:req.userData.userId},{$set: item},function(err){
         if(err){
           console.log(err);
         return  res.status(401).json({err})
         }
              
         return  res.status(201).json({mess:'success'})
          
       })
       
})
router.get('/payment',middlewareJwt, (req, res) => {
   
    var state = {state:"yes"}
    Admin.findById("5fa426fb59d9167c543d267a")
    .then(resultA=>{
      User.findOne({_id:req.userData.userId}).then(result=>{
           var will = result.will
              console.log(result.username)
          if(result.month=="month3"){
              
              var payment = new Payment({
                  name:result.username,
                  price:resultA.price1,
                  userId:result._id
                 
              })
              payment.save()
              .then(kq=>{
                    User.updateOne({_id:req.userData.userId},{$set: state},function(err){
                        if(err){
                            console.log(err);
                            res.status(401).json({error:'loi'})
                        }
                        res.status(201).json({mess:'success1',will:will,payment:kq})
                
                    })
                  
                  
                  })
              .catch(err=>{console.log(err)})

             // return res.status(200).json({mess:'success'})
          }
          else if(result.month=="month6"){
            var payment = new Payment({
                name:result.username,
                price:resultA.price2
               
            })
            payment.save()
            .then(kq=>{
                User.updateOne({_id:req.userData.userId},{$set: state},function(err){
                    if(err){
                        console.log(err);
                        res.status(401).json({error:'loi'})
                    }
                    res.status(201).json({mess:'success3',will:will,payment:kq})
            
                })
              
              
              })
          .catch(err=>{console.log(err)})
          }
          else if(result.month="year1"){
            var payment = new Payment({
                name:result.username,
                price:resultA.price3
               
            })
            payment.save()
            .then(kq=>{
                User.updateOne({_id:req.userData.userId},{$set: state},function(err){
                    if(err){
                        console.log(err);
                        res.status(401).json({error:'loi'})
                    }
                    res.status(201).json({mess:'success3',will:will,payment:kq})
            
                })
              
              
              })
          .catch(err=>{console.log(err)})

          }
          else{
              return res.status(401).json({mess:'fail'})
          }
      })
    })
    .catch(err=>{console.log(err)})

})
router.post('/consoleUser',(req,res)=>{
    User.updateOne({_id:req.userData.userId},{$set: {
        username: req.body.username,
        password: req.body.password,
        socialId:req.body.socialId,
        email: req.body.email,
        phone:req.body.phone,
    }},function(err){
        if(err){
          console.log(err);
        return  res.status(401).json({err})
        }
              
        return  res.status(201).json({message:'success'})
          
      })
})
router.post('/consoleRela',(req,res)=>{
    User.updateOne({_id:req.userData.userId},{$set: {
        'relative.name':req.body.relaName,
        'relative.socialId':req.body.relaSocialId,
        'relative.email':req.body.relaEmail,
        'relative.phone':req.body.relaPhone,
    }},function(err){
        if(err){
          console.log(err);
        return  res.status(401).json({err})
        }
              
        return  res.status(201).json({message:'success'})
           
      })
})
router.put('/reset-password',(req,res)=>{
    const email = req.body.email;
    User.findOne({email:email},(err,user)=>{
        if(err ||!user){
            return res.status(401).json({error:'User not found'})
        }
        const token = jwt.sign(
            {
              
              userId: user._id,
              
            },
            process.env.JWT_KEY,
            {
                expiresIn: "20m"
            }
          );
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL ,
                pass: process.env.PASSWORD 
            }
        });
        
        // Step 2
        let mailOptions = {
            from: process.env.EMAIL, // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'CODE',
            html: `<h2>Please click on given link</h2>
                  <p>http://localhost:8080/#/resetPass/${token}</p>
            `
        };
        return user.updateOne({resetLink:token},function(err,result){
            if(err){
                return res.status(401).json({error:'reset password link error'})
            }else{
                // Step 3
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return console.log('Error occurs');
                        
                    }else{
                        
                       return res.status(201).json({mess:"success"})
                    }
                    
                });
            }
        })
        
        
        
    

    })

})
router.put('/changePass',(req,res)=>{
    var resetLink = req.params.id;
    var newPass = {password:req.body.newPass}
    
        User.updateOne({resetLink:resetLink},{$set:newPass },function(err){
            if(err){
                console.log(err);
                res.status(401).json({error:'loi'})
            }
            res.status(201).json({mess:'success'})
    
        })
  

})
router.post('/checkForget',(req,res)=>{

})
router.get('/logOut',middlewareJwt,(req,res)=>{
    var updateDate = {last_login_date: new Date()}
    User.updateOne({_id:req.userData.userId},{$set:updateDate},function(err){
        if(err){
            console.log(err);
          return  res.status(401).json({err})
          }
                
          return  res.status(201).json({message:'success'})
    })
    
})
router.get('/toPayment',middlewareJwt,(req,res)=>{

    User.findOne({_id:req.userData.userId})
    .then(result=>{
        res.status(201).json({will:result.will})
    })
    .catch((err)=>{
        console.log(err)
        res.status(401).json(err)
    })
})
router.get('/showStage',middlewareJwt,(req,res)=>{

    User.findOne({_id:req.userData.userId})
    .then(result=>{
        res.status(201).json({state:result.state,name:result.username})
    })
    .catch((err)=>{
        console.log(err)
        res.status(401).json(err)
    })
})
//Console.vue
router.post('/consoleWill',middlewareJwt,(req,res)=>{
    var will= {will:req.body.will}
    User.updateOne({_id:req.userData.userId},{$set:will},function(err){
        if(err){
            console.log(err);
          return  res.status(401).json({err})
          }
                
          return  res.status(201).json({message:'success'})
    })
    
})
router.get('/turnonWill',middlewareJwt,(req,res)=>{

    User.findOne({_id:req.userData.userId})
    .then(result=>{
        res.status(201).json({will:result.will})
    })
    .catch((err)=>{
        console.log(err)
        res.status(401).json(err)
    })
})
router.get('/editUser',middlewareJwt,(req,res)=>{
    
    User.findOne({_id:req.userData.userId})
    .then(result=>{
        var user = {username:result.username,password:result.password,socialId:result.socialId,email:result.email,phone:result.phone,fullname:result.fullname}
        res.status(201).json(user)
    })
    .catch((err)=>{
        console.log(err)
        res.status(401).json(err)
    })
})
router.post('/editButtonUser',middlewareJwt,async(req,res)=>{
   
 
        
    var data= {username:req.body.username,password:req.body.password,socialId:req.body.socialId,email:req.body.email,phone:req.body.phone}
    User.updateOne({_id:req.userData.userId},{$set:data},function(err){
        if(err){
            console.log(err);
          return  res.status(401).json({err})
          }else{
            
            return  res.status(201).json({message:'success'})
          }
                
         
    })
    
})
router.post('/editButtonUser',middlewareJwt,async(req,res)=>{
   
 
        
    var data= {username:req.body.username,password:req.body.password,socialId:req.body.socialId,email:req.body.email,phone:req.body.phone}
    User.updateOne({_id:req.userData.userId},{$set:data},function(err){
        if(err){
            console.log(err);
          return  res.status(401).json({err})
          }else{
            User.find({_id:req.userData.userId})
            .then(result =>{
                let hashedPassword =  bcrypt.hash(result.password, 10);
                password = hashedPassword;
                User.save().then(result=>{
                    console.log(result)
                })
                res.json({mess:"vui"})
            })
            return  res.status(201).json({message:'success'})
          }
                
         
    })
    
})







module.exports = router