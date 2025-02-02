// src/app/api/users/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  await connectMongo();

  const { firstName, lastName, email, password } = await request.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = user.generateToken();
    return NextResponse.json({ token }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}