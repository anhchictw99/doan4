
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var User = require('./models/user.model');
const cors = require('cors');
const bodyParser = require('body-parser')
 const routerUser = require('./routers/user.router');
 const routerRelative = require('./routers/relative.router');
 const routerAdmin = require('./routers/admin.router');
 const nodemailer = require('nodemailer');
 const middlewareJwt = require('./middlewares/jwt.middleware');
 
var CronJob = require('cron').CronJob;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//mongoose
mongoose.connect('mongodb://localhost/doancuoi', {useNewUrlParser: true,
useUnifiedTopology: true});
//test mongoose 
console.log(mongoose.connection.readyState);
//mongo set
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//cors
app.use(cors());

//use routerUser

app.use('/admin',routerAdmin)
app.use('/relative',routerRelative)
app.use('/user',routerUser)


app.get('/', (req, res) => {
    res.send('haivlk')
  })
app.get('/checkEmail', (req, res) => {
      res.json({"mess":{"state":"no","mang":["con co","bebe","nodau"],"_id":"5fbc095400607c7856cbd459","username":"hai","password":"$2b$10$7qutMNqCt0RuXFsZnOinmOFqH4IZujs56DXKeJqiC20DeupKDJLxW","tag":{"ten":"cuoi","tuoi":"nha"},"__v":0}})
    })

  // var job = new CronJob('*/5 * * * * *', function() {
  //   console.log('You will see this message every second');
  // }, null, true, 'America/Los_Angeles');
  // job.start();

  // var job = new CronJob('*/5 * * * * *', function() {
  //     User.find({})
  //     .then(result=>{
          
  //         result.forEach((item)=>{
              
            
  //             var last1 = new Date(item.last_login_date.getTime()+20000);
  //             var last2 = new Date(item.last_login_date.getTime()+25000);
  //             var last = new Date();
              
  //             if(last.getTime()> last1.getTime() && last.getTime() < last2.getTime() ){
  //                       let transporter = nodemailer.createTransport({
  //                           service: 'gmail',
  //                           auth: {
  //                               user: process.env.EMAIL ,
  //                               pass: process.env.PASSWORD 
  //                           }
  //                       });
                        
  //                       // Step 2
  //                       let mailOptions = {
  //                           from: process.env.EMAIL, // TODO: email sender
  //                           to: item.email, // TODO: email receiver
  //                           subject: 'CODE',
  //                           text: 'sap het han'
  //                       };
  //                   // Step 3
  //                       transporter.sendMail(mailOptions, (err, data) => {
  //                           if (err) {
  //                               return console.log('Error occurs');
                                
  //                           }else{
  //                           return console.log('Email sent!!!');
  //                           }
                            
  //                       });


  //             }else{
  //                 console.log('nothing')
  //             }
  //         })
  //     })
  //   console.log('You will see this message every second');
  // }, null, true, 'Asia/Ho_Chi_Minh');
  // job.start();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} ${new Date}`)
})