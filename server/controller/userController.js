import User from "../models/UserSchema";
import bcrypt from "bcryptjs"
import createToken from "../util/tokenCreation";

export const login =async(req,res)=>{
    try {
        const {email,password}= req.body;
        
        if(!email || !password){
            return res.status(200).json({message:"All fields are required"})
        }
    
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({message:"Invalid email or password"});
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid email or password"});
        }
    
        const token = createToken(user);    
        res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false
    }   );
    
        return res.status(201).json({ message: "User logged in successfully", success: true });
        next();
    } 
    catch (error) {
        return res.status(500).json({message:"Server unavailable at the momemt , plz refresh"});
    }
}


export const register = async(req,res)=>{
    try {
        const {email , password,name, firstName, lastName , username } = req.body;
        const existUser= await User.findOne({email});
        if(existUser){
            return res.status(409).json({message:"User with this email already exist"});
        }

        const user = await User.create({email , password,name,  firstName, lastName , username });
        const token = createToken(user);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })

        return res.status(201).json({ message: "User signed in successfully"});
    } catch (error) {
        return res.status(500).json({message:"Server unavailable at the momemt , plz refresh"});
    }
}

export default { login, signup };