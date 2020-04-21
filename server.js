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


app.get('/', function (req, res) {
  res.send("hi there")
})

app.post('/email', (req, res) => {
  console.log(req.body);
})


 
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });