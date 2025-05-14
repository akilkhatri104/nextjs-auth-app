import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({message:"Logout successful",success: true,status:200})
        response.cookies.set("token","",{expires: new Date(0),httpOnly: true})

        return response
    } catch (error: any) {
        return NextResponse.json({error:error.message,status:500,success: false})
    }
}