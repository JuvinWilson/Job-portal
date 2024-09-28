import express from 'express';
import { Registercontroller,Logincontroller } from '../controllers/authcontroller.js'; 
import userauth from '../middlewares/authmiddleware.js';
import { rateLimit } from 'express-rate-limit'

// Ip limit

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


// router object
const router=express.Router();

// routes

// /**
//  * @swagger
//  * components:
//  * Schemas:
//  * 	User:
//  * 		type:Object
//  * 		required: 
//  * 			- name
//  * 			- lastname
//  * 			- email
//  * 			- location
//  * 			- password
//  * 		properties:
//  * 			id:
//  * 				type: String
//  * 				description: The auto generated id of user collection
//  * 			name:
//  * 				type:String
//  * 				description: User Name
//  * 			lastname:
//  * 				type:String
//  * 				description: User lastname
//  * 			email:
//  * 				type:String
//  * 				description: User email address
//  * 			location:
//  * 				type:String
//  * 				description: User location city or country
//  * 			password:
//  * 				type:String
//  * 				description: user password greater than 8 characters
//  * 		example:
//  * 			id:GDHJGD788BJBJ
//  * 			name:john
//  * 			lastname:doe
//  * 			email:john@gmail.com
//  * 			location:China
//  * 			password:john@1234
// */

// REGISTER ROUTE || Post Registration
router.post('/register',Registercontroller)

//Login Route|| post Login
router.post('/login',Logincontroller)

export default router;
