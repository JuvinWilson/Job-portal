import express from 'express';
import {
     deleteJobController, 
     getalljobscontroller, 
     jobcontroller, 
     jobStatsController, 
     updatejobcontroller,
     appliedjobcontroller,
     getappliedjobscontroller,
    } from '../controllers/jobcontroller.js'
import userauth from '../middlewares/authmiddleware.js';
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/resumes/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

// router object
const router=express.Router();

// create jobs || Post jobs

router.post('/jobs',userauth,jobcontroller)

// Get jobs || Get jobs

router.get('/getjobs',userauth,getalljobscontroller)

// update jobs || Update jobs

router.patch('/updatejobs/:id',userauth,updatejobcontroller)

// delete jobs || Delete

router.delete('/deletejobs/:id',userauth,deleteJobController)

// job STATS Filter || GET

router.get('/job-stats',userauth,jobStatsController)

// POST JOB APPLICATION || POST

router.post('/appliedjobs',userauth,upload.single('resume'),appliedjobcontroller)

// Get applied jobs || Get 

router.get('/getappliedjobs',userauth,getappliedjobscontroller)



export default router;