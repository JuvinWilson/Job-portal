import express from 'express'
import { updateusercontroller } from '../controllers/usercontroller.js'
import userauth from '../middlewares/authmiddleware.js'


//Router object

const router = express.Router()

// routes
// Get Users || GET

// Update Users || PUT
router.put('/update-users',updateusercontroller)


export default router