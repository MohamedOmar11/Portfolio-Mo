import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const contents = await Content.find({});
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    const content = await Content.create(body);
    return NextResponse.json(content, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
