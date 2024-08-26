import User from "../models/User.model.js"

export const createUser = async (req,res) => {
    try{
        console.log("user")
        const user= new User(req.body)
        await user.save()
        res.status(201).json({message:"User created Succesfully",user})
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find()
        if(!users || users.length === 0){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(users)
    } catch (err) {

    }
}

export const getUserById = async (req,res) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const updateUserById = async (req,res) => {
    try{
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}


export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:'User deleted successfully'})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}