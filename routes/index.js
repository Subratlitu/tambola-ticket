const router = require("express").Router();
const tambolaController=require('../controller/tambolaController')
const userController=require('../controller/userController')

router.get('/api/login',userController.login)
router.post('/api/signup',userController.signUp)
router.post('/api/generate-ticket',tambolaController.createTicket)
router.get('/api/get-all-tickets',tambolaController.getAllTickets)

module.exports = router;
