import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    const content = await Content.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const content = await Content.findByIdAndDelete(params.id);
    if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    return NextResponse.json({ message: 'Content deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
