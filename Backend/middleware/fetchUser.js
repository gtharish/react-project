import JWT from "jsonwebtoken";
// import user from "../models/user";
const JWT_SECRET = "this is mr.stark";

const fetchUser = async(req,res,next)=>{
    const token = req.header("authToken");
    if(!token){
        res.status(401).send("then token is not generated");
    }
    else{
        const data = JWT.verify(token,JWT_SECRET);
        req.user= data.user;
    
    }
    next();

};
export default fetchUser;