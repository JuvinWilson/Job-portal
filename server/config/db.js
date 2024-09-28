import mongoose from "mongoose";

const ConnectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB at ${mongoose.connection.host}`.bgGreen);
    }
    catch(error){
        console.error(`Error connecting to MongoDB ${error}`.bgWhite);
    }
};

export default ConnectDb