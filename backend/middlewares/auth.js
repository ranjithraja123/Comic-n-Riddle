import jwt from "jsonwebtoken"
import User from "../models/User.model.js";


export const protect = async (req,res,next) => {
    let token;

    if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }

    if(!token) {
        return res.status(401).json({message: 'You are not logged in! Please log'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        return res.status(401).json({message: 'Not authorized to access'})
    }
    
}


export const authorize = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: 'You do not have permission to access this'})
        }
        next()
    }
    
}