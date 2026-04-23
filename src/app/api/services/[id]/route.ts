import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const service = await Service.findByIdAndDelete(params.id);
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
