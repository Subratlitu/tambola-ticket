const userModel=require("../model/userModel")
const ticketModel=require("../model/ticketModel")
const validUrl=require('../validator/validUrl')

module.exports = {
    createTicket: async (req, res) => {
      try {
            let {email,tickets}=req.body

            if(!validUrl.isValid(email)){
                res.status(400).send({status:false,message:"email is required"})
                return
            }
            if(!validUrl.isValidEmail(email)){
                res.status(400).send({status:false,message:"enter a valid email address"})
                return
            }
            if(!validUrl.isValid(tickets)  && tickets>0){
                res.status(400).send({status:false,message:"ticket is required"})
                return
            }
            
            let user=await userModel.findOne({email:email})

            if(!user){
                res.status(404).send({status:false,message:"You dont have access to create tickets"})
                return
            }
            // checking if ticket is already having on this id or not
            
            let ticketId=validUrl.generateRandomCode()
            let allTickets=[]
            while(allTickets.length < tickets ){
                const singleTicket = await validUrl.generateTicket() 
                if(! allTickets.some(ticket => JSON.stringify(ticket) === JSON.stringify(singleTicket))){
                   allTickets.push(singleTicket)
                }
            }
    
            let newTicket=await ticketModel.create({ticketId:ticketId,tickets:allTickets})
            if(newTicket){
                return res.status(201).send({status:true,message:"ticket created successfully",data:newTicket})
            }

  
      } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
    },

    getAllTickets:async (req, res) => {
        try {
            console.log("*>>>>>>>>>>>>>>>>>>>>>>>>>",req.body);
            let {ticketId}=req.body
        
            if(!validUrl.isValid(ticketId)){
                res.status(400).send({status:false,message:"ticket id is required"})
                return
            }
            const ticketsPerPage = 10; // Number of tickets to fetch per page

            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

               // Fetch the total tickets for the given ticketId
            const totalTickets = await ticketModel.find({ ticketId: ticketId }).exec();
            //console.log(totalTickets,">>>>>>>>>>>>>>>>")
            const totalTicketArray = totalTickets[0].tickets; // Assuming the array of tickets is stored in the 'tickets' property

            const totalPages = Math.ceil(totalTicketArray.length / ticketsPerPage);
            const currentPageTickets = totalTicketArray.slice(skip, skip + ticketsPerPage);
            console.log(currentPageTickets.length,"**********")
            const downloadedTickets = {
                tickets: currentPageTickets,
                currentPage: parseInt(page),
                totalPages,
                totalTickets: totalTicketArray.length,
            };
            return res.status(201).send({status:true,message:"ticket fetched successfully",data:downloadedTickets})
      
          } catch (error) {
            console.log(error);
            return res.status(500).send("Server Error");
          }
    }
  
  };
