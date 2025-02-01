// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongo();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user._id.toString());

    return NextResponse.json({ message: "Login successful", user, token }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}