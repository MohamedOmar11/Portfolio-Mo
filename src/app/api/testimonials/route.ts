import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ order: 1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
