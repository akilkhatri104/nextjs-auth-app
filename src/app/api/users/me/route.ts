import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from '@/db/db'
import { get } from "http";

connect()

export async function GET(request: NextRequest){
    try {
        const userId = getDataFromToken(request)
        const user = await User.findById(userId).select("-password")

        if(!user){
            return NextResponse.json({error:"User does not exist",status:400,success: false})
        }

        return NextResponse.json({message:"User fetched successfully",data:user,success: true,status:200})
    } catch (error) {
        return NextResponse.json({error: error.message,status:500,success:false})
    }
}