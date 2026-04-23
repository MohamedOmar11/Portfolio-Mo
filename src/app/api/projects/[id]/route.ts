import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await request.json();
    await dbConnect();
    
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const project = await Project.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
