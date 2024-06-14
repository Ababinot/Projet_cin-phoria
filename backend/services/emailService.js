const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'cinephoria.contact@yahoo.com',
    pass: 'Cinephoria49!'
  }
});

const mailOptions = {
  from: 'cinephoria.contact@yahoo.com',
  to: 'cinephoria.contact@yahoo.com',
  subject: 'Test Email',
  text: 'test'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log('Email sent: ' + info.response);
});
