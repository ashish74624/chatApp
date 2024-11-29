import jwt from "jsonwebtoken"

const createToken=(user)=>{
    return jwt.sign({user},process.env.SECRET);
}

export default createToken;