import jwt, { decode } from "jsonwebtoken";

const isAuth = async(req, resizeBy, next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message: "Tokrn not found"})
        }
        const decodeToken=jwt.verify(token, process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(400).json({message: "Invalid Token"})
        }
        console.log(decodeToken);
        req.userId=decodeToken.userId       
    } catch (error) {
        return res.status(500).json({message: "UnAuthorized"})
    }
}

export default isAuth;