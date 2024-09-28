
import usermodel from '../models/usermodel.js'

// Register controller
export const Registercontroller= async(req,res,next)=>{
        const {name,lastname,email,location,password} = req.body;
        //validate
        if(!name){
            next('name is required')
        }
        if(!lastname){
            next('lastname is required')
        }
        if(!email){
            next('email is required and it must be a valid email address')
        }
        if(!location){
            next('location is required')
        }
        if(!password){
            next('password is required and it must be greater than 8 characters')
        }
        // check existing user
        const existinguser = await usermodel.findOne({email})
        if(existinguser){
            next('user already exists please log in')
        }
        
    
        // create newuser
        const newuser = await usermodel.create({name,lastname,email,location,password})
        //token
        const token = newuser.createJWT()
        res.status(201).send({
            success:true,
            message:'user registered successfully',
            newuser:{
                name:newuser.name,
                lastname:newuser.lastname,
                email:newuser.email,
                location:newuser.location
            },
            token,
        })
}

// Logincontroller

export const Logincontroller = async (req,res,next) =>{
    const {email,password} = req.body
    // validation
    if(!email || !password){
        next('PLEASE PROVIDE ALL FIELDS')
    }
    // FIND USER BY EMAIL

    const user= await usermodel.findOne({email}).select("+password")
    if(!user){
        next("invalid Username or password")
    }

    // compare password

    const ismatch = await user.comparePassword(password)
    if(!ismatch){
        next("invalid Username or password")
    }
    user.password =undefined;
    const token =user.createJWT()
    res.status(200).json({
        success:true,
        message:'Login successful',
        user,
        token,
    })
}