import User from "../models/UserSchema";
import jwt from "jsonwebtoken"

export const verify = async(req,res)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message: "Please login to continue" });
        }

        jwt.verify(token,process.env.SECRET, async(err,data)=>{
            if(err){
                return res.status(401).json({ message: "Please login to continue" });
            }else{
                const user = await User.findById(data.id);
                if(user){
                    return res.status(200).json({message:"User found" , user});
                }else{
                    return res.status(404).json({message:"User does not exist"});
                }
            }
        })
    } catch  {
        return res.status(500).json({message:"Server unavailable at the momemt , plz refresh"});
    }
}

export default { verify };