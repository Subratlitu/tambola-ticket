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
console.log("MMMMMMMMMMMMMMMMMMM")
app.use("/", route);
const tambolaController=require('./controller/tambolaController')
const userController=require('./controller/userController')

app.get('/api/login',userController.login)
app.post('/api/signup',userController.signUp)
app.post('/api/generate-ticket',tambolaController.createTicket)
app.get('/api/get-all-tickets',tambolaController.getAllTickets)


app.listen(4000, () => {
    console.log("App is running on PORT 4000");
  });