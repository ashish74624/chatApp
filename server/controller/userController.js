import User from "../models/UserSchema";
import bcrypt from "bcryptjs"
import createToken from "../util/tokenCreation";

const login =async(req,res)=>{
    try {
        const {email,password}= req.body;
        
        if(!email || !password){
            res.status(200).json({message:"All fields are required"})
        }
    
        const user = await User.findOne({email});
        
        if(!user){
            res.status(404).json({message:"Invalid email or password"});
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid email or password"});
        }
    
        const token = createToken(user);    
        res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false
    }   );
    
        res.status(201).json({ message: "User logged in successfully", success: true });
        next();
    } 
    catch (error) {
        res.status(500).json({message:"Server unavailable at the momemt , plz refresh"});
    }
}


const register = async(req,res)=>{
    try {
        const {email , password,name } = req.body;
        const existUser= await User.findOne({email});
        if(existUser){
            res.status(409).json({message:"User with this email already exist"});
        }

        const user = await User.create({email , password,name });
        const token = createToken(user);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })

        res.status(201).json({ message: "User signed in successfully"});
    } catch (error) {
        res.status(500).json({message:"Server unavailable at the momemt , plz refresh"});
    }
}

