import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const lead = await Lead.create(body);
    return NextResponse.json({ message: 'Lead submitted successfully', id: lead._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
