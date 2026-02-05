import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import  dbConnect  from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email }).select(
      "name email phone address role"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      user: {
        name: user.name || "",
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, address } = body;
    
if (!/^[6-9]\d{9}$/.test(phone)) {
  return NextResponse.json(
    { message: "Invalid mobile number" },
    { status: 400 }
  );
}
const formattedPhone = `+91${phone}`;

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user details
    user.name = name || user.name;
    user.phone = formattedPhone || user.phone;
    user.address = address || user.address;

    await user.save();

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}