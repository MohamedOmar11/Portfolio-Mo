import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const email = 'MohamedOmar@example.com';
    const password = '102030Mm.?'; // The password you want to log in with

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists! You can log in.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user successfully created! Go to /admin/login to sign in.' 
    });

  } catch (error: any) {
    console.error('Setup Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
