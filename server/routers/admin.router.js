var express = require('express')
var router = express.Router()
const jwt = require("jsonwebtoken");
var middlewareJwt = require('../middlewares/jwt.middleware')
var Admin = require('../models/admin.model');
var User = require('../models/user.model');
var Payment = require('../models/payment.model');
const bcrypt = require('bcrypt');
router.get('/showcheckOut', middlewareJwt, (req, res) => {
  User.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$price" },
        totalQuan: { $sum: "$quantity" }
      }
    }
  ]).then(kq => {
    console.log(kq);
    return res.status(201).json({ kq })
  })
    .catch(err => { console.log(err) })



})
router.get('/sortState', middlewareJwt, (req, res) => {
  User.aggregate([
    { $match : { state : "yes" } }
  ]).then(kq => {
    console.log(kq);
    return res.status(201).json({ kq:kq })
  })
    .catch(err => { console.log(err) })



})
router.get('/statical', (req, res) => {
  User.find({})
    .then(users => {
      const response = {
        count: users.length,
        users: users.map((user) => {

          return {
            //date : new Date(user.last_login_date).getTime(),
            last: ((new Date(user.last_login_date).getTime() + 180000 - new Date()) / 180000) * 100,
            price: user.price,
            username: user.username,
            userId: user._id,
            //loginUser : user.last_login_date,
            state:user.state,
        
           // date1 : new Date().getTime()
            //newDate : date.getTime()
            // other property
          }

        })

      };
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(401).json({ mess: 'fail' })
      console.log(err)
    })
  
})

router.post('/loginAdmin', (req, res) => {
  var admin = Admin({
    userAdmin: req.body.userAdmin,
    password: req.body.password
  })
  admin.save()
    .then(result => {
      console.log(result)



    })
    .catch(err => {
      console.log(err)
      res.status(401).json({ err })
    })

})
router.post('/login', (req, res) => {
  Admin.findOne({ userAdmin: req.body.userAdmin })

    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            mess: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user.userAdmin,
              userId: user._id,
              role: user.role
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            mess: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          mess: "Auth failed"
        });
      });
    })
})
router.delete('/del/:id', middlewareJwt, (req, res) => {
  // User.findOneAndDelete({_id:req.params.id},(err)=>{
  //     if(err){
  //         console.log(err)
  //        return res.status(401).json({err})
  //     }
  //     return res.status(201).json({message:'success'});
  // })
    var id = req.params.id
 
    User.findByIdAndDelete(id, (err,docs) => {
      if (err) {
        
        console.log(err)
        res.status(401).json({ err: 'fail' })
      }else{
        return res.status(201).json({ message: 'success' })
      }
      

    })


})

router.post('/changePrice', (req, res) => {
  Admin.updateOne({ userAdmin: process.env.CHANGEPRICE }, {
    $set: {
      price1: req.body.price1,
      price2: req.body.price2,
      price3: req.body.price3
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ err })
    }

    return res.status(201).json({ mess: 'success' })

  })
})

module.exports = router;