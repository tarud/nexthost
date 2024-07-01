import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import user from '@/models/userModel'
import { NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'
import jwt from "jsonwebtoken";


connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
    console.log(reqBody);
    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error: "user does nor exist"}, {status:400})
    } 
     const validPasswpord = await bcryptjs.compare(password, user.password)
     if(!validPasswpord){
        return NextResponse.json({error: " Invalid password"}, {status: 400})
     }
     //create token data 
     const tokenData = {
        id:user._id_,
        username: user.username,
        email:user.email

    }
    //create token
    const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d "})
    const response = NextResponse.json({
        message: "login successful",
        success: true,
    })
    response.cookies.set("token", token, {
        httpOnly:true,
    })  
    return response;
    }
    
    catch (error: any){
        return NextResponse.json({error: error.message},{status:500})
    }
}