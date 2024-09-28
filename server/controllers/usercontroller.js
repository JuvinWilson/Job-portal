import usermodel from "../models/usermodel.js";


export const updateusercontroller= async (req,res,next) => {
    const {name,email,lastname,location}=req.body;
    if(!name || !email || !lastname || !location){
        next('please provide all fields');
    }

    const user =await usermodel.findOne({email: email});

    if(!user){
        next("user not found");
    }
    
    user.name = name
    user.email = email
    user.lastname = lastname
    user.location = location

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message:"user updated successfully",
        user,
        token,
    })
};
