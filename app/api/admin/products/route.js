import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
    try {
        const token=await getToken({req})
        if(!token || token.role !=="admin"){
            return NextResponse.json(
                { error:"Unauthorized" }, 
                { status: 401 }
            );
        }
        await dbConnect();
        const products=await Product.find().sort({createdAt:-1});
        return NextResponse.json(
            { products },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE (req) {
    try {
        const token=await getToken({req})
        if(!token || token.role !=="admin"){
            return NextResponse.json(
                { error:"Unauthorized" }, 
                { status: 401 }
            );
        }
        const body = await req.json();
        const { productId } = body;
        await dbConnect();
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}