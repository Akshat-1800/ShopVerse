import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req){
    try {
        const token= await getToken({ req });
        if(!token || token.role !=="admin"){
            return NextResponse.json(
                { error:"Unauthorized" },
                {status:401}
            );
        }
        await dbConnect();


        const users=await User.find().
        sort({createdAt:-1}).
        select("-password");


        return NextResponse.json(
            {users},
            {status:200}
        );

    } 
    catch (error) {
        return NextResponse.json(
            console.log("Error fetching users:", error),
            { error: "Internal Server Error" },
            { status: 500 }
        );
        
    }

}