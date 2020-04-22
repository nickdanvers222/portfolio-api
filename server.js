require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3001;
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
cors({credentials: true, origin: true})
app.use(express.static('public'))



const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: DOMAIN});



app.get('/', function (req, res) {
  res.send("hi there")
})

app.post('/email', (req, res) => {
  const { name, email, message } = req.body.data
  
  
  const data = {
    from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
    to: "ndanvers222@gmail.com",
    subject: `name:${name} , email:${email}`,
    text: `${message}`
  };
  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    console.log(error)
  });
  
  // You can see a record of this email in your logs: https://app.mailgun.com/app/logs.
  
  // You can send up to 300 emails/day from this sandbox server.
  // Next, you should add your own domain so you can send 10000 emails/month for free.




  ;})


 
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });