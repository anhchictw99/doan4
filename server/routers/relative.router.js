
var express = require('express')
var router = express.Router()
var User = require('../models/user.model');
var Relative = require('../models/relative.model');
const jwt = require("jsonwebtoken");
var middlewareJwt = require('../middlewares/jwt.middleware')
const nodemailer = require('nodemailer');
var random = require('random');
router.get('/api',(req,res)=>{
    var x = {mess:"chan"}
    res.send(x)
})
// router.post('/signinRelative',(req,res)=>{
//     var relative = new Relative({
//         name: req.body.name,
//         email: req.body.email
//     })
//     relative.save()
//     .then(result =>{
//         console.log(result)
//         res.status(201).json({message:result})
//     })
// })
router.post('/login',(req,res)=>{
    
        User.findOne({'relative.socialId':req.body.socialId})
        .then(kq=>{
            var email =kq.relative.email;
            if(kq.username = req.body.fullname){
                if(kq.relative.question1 == req.body.questionare || kq.relative.question2 == req.body.questionare || kq.relative.question3 == req.body.questionare){
                    var rand = random.int(min = 1000, max = 9999)
                                // User.updateOne({_id:req.userData.userId},{$set: item},function(err){
                                //     if(err){
                                //       console.log(err);
                                //     return  res.status(401).json({err})
                                //     }
                                        
                                //     return  res.status(201).json({message:'success'})
                                    
                                //   })
                                
                                
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
                                    text: rand
                                };
                                
                                // Step 3
                                transporter.sendMail(mailOptions, (err, data) => {
                                    if (err) {
                                        return console.log('Error occurs');
                                        
                                    }else{
                                       return console.log('Email sent!!!');
                                    }
                                    
                                });
                                const token = jwt.sign(
                                    {
                                      name: kq.name,
                                      userId: kq._id,
                                      role: kq.relative.role
                                    },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "1h"
                                    }
                                    
                                  );
                                  return res.status(200).json({
                                    mess: "Auth successful",
                                    token: token,
                                    random:rand
                                  });
                                 // res.status(201).json({message:'thanh cong checkRelative'})
                }else{
                    res.status(401).json({message:'that bai'})
                }
            }
            
            
        }).catch(err=>{console.log(err);
            res.status(401).json({message:'loi phan checkRelative'})
        })  
})
router.get('/relaSeen',middlewareJwt,(req,res)=>{
    var data = {state:'seen'}
    
    User.updateOne({_id:req.userData.userId},{$set:data},function(err){
        if(err){
            console.log(err);
          return  res.status(401).json({err})
          }else{
            //console.log('conco')
            return  res.status(201).json({mess:'thanhcong'})
          }
                
         
    })
})

// router.post('/authRelative',middlewareJwt,(req,res)=>{

//     User.findOne({_id:req.userData.userId})
//     .then(kq=>{
//         if(kq.random == req.body.random){
//             res.status(201).json({message:'success'})
//         }
//         return res.status(401).json({err:'fail'})

//     })
//     .catch(err=>{
//         console.log(err)
//         return res.status(401).json({err:'fail'})
//     })
// })
// router.post('/checkQuestionare',(req,res)=>{
//     User.findOne({'relative.socialId':req.body.socialId})
//     .then(kq=>{
//        if(kq.relative.question1 == req.body.questionare || kq.relative.question2 == req.body.questionare || kq.relative.question3 == req.body.questionare) {
//         var relative = new Relative({
//             email: req.body.email,
//             name: req.body.name,
//             random: random.int(0, 100)
//         })
//         relative.save()
//         .then(result =>{
//             console.log(result);
//             // Step 1
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,  // TODO: your gmail account
//         pass: process.env.PASSWORD// TODO: your gmail password
//     }
// });

// // Step 2
// let mailOptions = {
//     from: process.env.EMAIL, // TODO: email sender
//     to: result.email, // TODO: email receiver
//     subject: 'code nguoi than',
//     text: result.random
// };

// // Step 3
// transporter.sendMail(mailOptions, (err, data) => {
//     if (err) {
//         return log('Error occurs');
//     }
//     return log('Email sent!!!');
// });
// const token = jwt.sign(
//     {
//       name: user.username,
//       userId: user._id,
//       role: user.role
//     },
//     process.env.JWT_KEY,
//     {
//         expiresIn: "1h"
//     }
//   );

//             res.status(201).json({
//                 message: "Relative created",
//                 token: token
//               });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//               error: err
//             });
//           });
//        }

//     })
    
  
   
// })
module.exports = router;