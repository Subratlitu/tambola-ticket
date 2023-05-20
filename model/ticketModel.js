const mongoose=require('mongoose');

const ticketModel=new mongoose.Schema({
    ticketId:{type:String},
    tickets: [[]]

},{timestamps:true})

module.exports=mongoose.model('tambolaticket',ticketModel)