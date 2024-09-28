import jobmodel from "../models/jobsModel.js"
import Application from "../models/Applicationmodel.js"
import mongoose from "mongoose";
import moment from "moment";

// create jobs
export const jobcontroller = async(req,res,next)=>{
    const {company,position} = req.body
    if(!company || !position) {
        next('please provide all fields')
    }
    req.body.createdBy =req.user.userId
    const job = await jobmodel.create(req.body)
    res.status(201).json( { job } );
};


// get jobs
export const getalljobscontroller = async(req, res, next)=>{
    const{status,workType,workLocation,search,sort}=req.query
    // conditions for searching filters
    const queryObject = {
        createdBy:req.user.userId 
    }

    // logic filters
    if(status && status!== 'all'){
        queryObject.status = status
    }
    if(workType && workType!== 'all'){
        queryObject.workType = workType
    }
    if(workLocation && workLocation!== 'all'){
        queryObject.workLocation = workLocation
    }
    if(search ){
        queryObject.position = {$regex: search,$options:"i"}
    }

    let queryResult =  jobmodel.find(queryObject)

    // sorting
    if(sort === 'latest'){
        queryResult=queryResult.sort('-createdAt')
    }
    if(sort === 'oldest'){
        queryResult=queryResult.sort('createdAt')
    }
    if(sort === 'a-z'){
        queryResult=queryResult.sort('position')
    }
    if(sort === 'z-a'){
        queryResult=queryResult.sort('-position')
    }

    // pagination
    const page = Number(req.query.page)|| 1
    const limit = Number(req.query.limit)|| 10
    const skip = (page-1)*limit

    queryResult = queryResult.skip(skip).limit(limit)

    // jobscount
    const totaljobs = await jobmodel.countDocuments(queryResult)
    const numOfpage = Math.ceil(totaljobs/limit)

    const jobs = await queryResult;

    // const jobs1 = await jobmodel.find({createdBy:req.user.userId})
    res.status(200).json({
        totaljobs,
        jobs,
        numOfpage
    })
}

//Update jobs

export const updatejobcontroller = async(req, res, next)=>{
    const{id}=req.params
    const {company,position}=req.body;
    // validation error
    if(!company || !position){
        next('please provide all fields');
    }
    //  find job
    const jobs =await jobmodel.findOne({_id: id});
    // validation
    if(!jobs){
        next(`No jobs found with this id ${id}`)
    }
    if(!req.user.userId === jobs.createdBy.toString()){
        next('your not authorized to update this job')
        return;    
    }
    const updatejob = await jobmodel.findOneAndUpdate({_id: id},req.body,{
        new: true,
        runValidators:true,
    })
    // res
    res.status(200).json({ updatejob });
}


// delete job controller

export const deleteJobController = async(req, res, next) => {
    const{id}=req.params;
    // find jobs
    const jobs =await jobmodel.findOne({_id: id});
    //  validation
    if(!jobs){
        next(`no jobs found with this id ${id}`)
    }
    if(!req.user.userId === jobs.createdBy.toString()){
        next('your not authorized to delete this job')
        return;    
    }

    //  delete

    await jobs.deleteOne()
    res.status(200).json({message:'success, job deleted'})
}

// job stats and filter

export const jobStatsController = async(req, res, next) => {
    const stats =await jobmodel.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new  mongoose.Types.ObjectId(req.user.userId),
            }
        },
        {
            $group: {
                _id:'$status',
                count:{$sum:1},
            }
        },
    ])
    // default status
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    // monthly or yearly stats
    let monthlyStats =await jobmodel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
                count:{
                    $sum:1
                }
            }
        }
    ])
    monthlyStats=monthlyStats.map(item =>{
        const{_id:{year,month},count} = item
        const date = moment().month(month - 1).year(year).format("MMM Y")
        return{date,count}
    })
    .reverse()
    res.status(200).json({totaljobs:stats.length,defaultStats,monthlyStats});
}

// post applied jobs

export const appliedjobcontroller=async(req,res)=>{
    try {
        const { jobId,firstname, lastname, email, phoneno, currentctc, expectedctc } = req.body;
        const user = req.user.id; // Get user from auth middleware

        // Fetch job details
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        // Create the application
    const newApplication = new Application({
        userId: req.user.id, // Assuming you are using some auth middleware
        jobId: job._id,
        firstname,
        lastname,
        email,
        phoneno,
        currentctc,
        expectedctc,
        resume: req.file.path, // Assuming you're handling file uploads with middleware like multer
      });
  
      await newApplication.save();
  
      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        application: newApplication,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// get applied jobs

export const getappliedjobscontroller=()=>{

}

