import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//schema design
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: [ true, 'First Name is required']
    },
    lastname: {
        type: 'String',
        required: [ true, 'Last Name is required'],
    },
    email:{
        type:'String',
        required:[true,"Email is required and should be unique"],
        unique:true,
        validate:validator.isEmail,   
    },
    location:{
        type:'String',
        required:[true,"location is required"],
    },
    password:{
        type:'String',
        required:[true,"Password is required"],
        minlength:[8, 'Password must be at least 8 characters'],
        select:true,
    },
},
{timestamps:true}
);

// bcrypt password middleware
userSchema.pre('save', async function(){
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})

// compare passwords
userSchema.methods.comparePassword = async function(userPassword){
    const ismatch = await bcrypt.compare(userPassword,this.password);
    return ismatch
}

//json web token
userSchema.methods.createJWT = function(){
    return  JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn: '1d'});
}

const usermodel = mongoose.model('users',userSchema);

export default usermodel