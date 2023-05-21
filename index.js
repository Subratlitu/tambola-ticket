const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let route=require("./routes/index")
mongoose.connect(process.env.MONGO_CONNECT_URI , {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected..."))
.catch ( err => console.log(err) )

app.use("/", route);



app.listen(4000, () => {
    console.log("App is running on PORT 4000");
  });