import User from "../models/User.model.js";

export const register = async (req,res) => {
    try{
        console.log("register")
        const {username,email,password,role} = req.body;
        const newUser = new User({
            username,
            email,
            password,
            role
        })
        await newUser.save();
        const token = newUser.getSignedJwtToken()
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({message:"User created successfully",newUser,token})
    } catch(err) {
        res.status(500).json({error:err.message})
    }
   
}

export const login = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({message:'Please provide email and password'})
    }
    try{
       const user = await User.findOne({email});

       if(!user){
        res.status(404).json({message:'User not found'})
       }
       console.log(user,'userr')
       const isMatch = await user.matchPassword(password)

       if(!isMatch){
        return res.status(401).json({message:'Invalid Credentials'})
       }
       const token = user.getSignedJwtToken()

       res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

       res.status(200).json({message:'User logged in',token,user})

    } catch(err) {
        res.status(500).json({error:err.message})
    }
}

export const logout = (req,res) => {
    res.cookie('token','',{httpOnly:true, expires: new Date(0),  secure: process.env.NODE_ENV === 'production'})
    res.status(200).json({ message: 'User logged out' });
}