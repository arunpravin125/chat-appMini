import jwt from "jsonwebtoken"

export const generateTokenAndCookies = async(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "15d"
    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, // 15days in seconds
        httpOnly:true ,
        sameSite:true
    })
}