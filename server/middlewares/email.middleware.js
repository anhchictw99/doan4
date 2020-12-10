module.exports.checkEmail =function(email){
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
        text: this.random.toString()
    };
    
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
            
        }else{
           return console.log('Email sent!!!');
        }
        
    });

}