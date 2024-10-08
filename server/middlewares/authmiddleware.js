import JWT from 'jsonwebtoken'

const userauth = async (req,res,next) => {
    const authHeader =req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next("auth failed")
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload =JWT.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId}
        next()
    }
    catch(error){
        next("auth failed")
    }
}

export default userauth