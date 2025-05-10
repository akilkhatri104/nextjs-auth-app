import {connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        //check if user has given all the inputs
        if(!username || !email || !password){
            return NextResponse.json({error:"Please add all fields",status:400})
        }

        //check if email or username already exists
        const user = await User.findOne({
            $or:[{email},{username}]
        })

        if(user){
            return NextResponse.json({error:"email or username already exists",status:400,success: false})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()

        return NextResponse.json({message:"User created successfully",savedUser,status:201,success:true})
    } catch (error : any) {
        return NextResponse.json({error:error.message,status:500})
    }
}