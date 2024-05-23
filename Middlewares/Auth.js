import jwt from "jsonwebtoken";


const Authenticate = (req,res,next) => {
    const jwttoken = req.header("Auth")
    console.log("This is jwt token ",jwttoken)

    if(!jwttoken) return res.status(400).json({msg:"Please login first"})
    next()
} 

 export default Authenticate