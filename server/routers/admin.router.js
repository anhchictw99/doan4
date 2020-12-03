var express = require('express')
var router = express.Router()
const jwt = require("jsonwebtoken");
var middlewareJwt = require('../middlewares/jwt.middleware')
var Admin = require('../models/admin.model');
var User = require('../models/user.model');
var Payment = require('../models/payment.model');
const bcrypt = require('bcrypt');
router.get('/showcheckOut', middlewareJwt, (req, res) => {
  Payment.aggregate([
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
router.get('/statical', (req, res) => {
  User.find({})
    .then(users => {
      const response = {
        count: users.length,
        users: users.map((user) => {

          return {
            date : new Date(user.last_login_date).getTime(),
            last: ((new Date(user.last_login_date).getTime() + 180000 - new Date()) / 180000) * 100,
            price: user.price,
            username: user.username,
            loginUser : user.last_login_date,
        
            date1 : new Date().getTime()
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

  if (req.userData.role == 'admin') {
    Payment.findOneAndDelete({ _id: req.params.id }, (err) => {
      if (err) {
        c
        console.log(err)
        res.status(401).json({ err: 'fail' })
      }
      return res.status(201).json({ message: 'success' })

    })
  } else {
    res.status(401).json({ err: 'fail' })
  }

})
//router moi
router.post('/payment', (req, res) => {

  Admin.findById("5fbdedd35c126d81575ca41c")
    .then(resultA => {
      User.findById("5fbc095400607c7856cbd459").then(result => {

        console.log(result.username)
        if (result.month = 3) {

          var payment = new Payment({
            name: result.username,
            price: resultA.price1

          })
          payment.save()
            .then(kq => {
              res.status(201).json({ mess: 'success1' })
              console.log(kq)
            })
            .catch(err => { console.log(err) })

          // return res.status(200).json({mess:'success'})
        } else {
          return res.status(401).json({ mess: 'fail' })
        }
      })
    })
    .catch(err => { console.log(err) })

})
router.post('/changePrice', (req, res) => {
  Admin.updateOne({ userAdmin: 'cuongcuoi' }, {
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