import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const lead = await Lead.findByIdAndDelete(params.id);
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
