import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ order: 1 });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
