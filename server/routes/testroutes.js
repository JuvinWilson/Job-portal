import express from 'express';
import { testcontroller } from '../controllers/testcontroller.js';
import userauth from '../middlewares/authmiddleware.js';

//rest router object 

const router = express.Router();

// ROUTES

router.post('/test',userauth,testcontroller);

export default router;