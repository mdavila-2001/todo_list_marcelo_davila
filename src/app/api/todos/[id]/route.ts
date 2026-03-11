import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    const body = await request.json();
    
    const todoIndex = db.findIndex(t => t.id === numericId);
    if (todoIndex === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const todo = db[todoIndex];

    if (body.text !== undefined) {
      todo.text = body.text.trim();
    }
    
    if (body.completed !== undefined) {
      todo.completed = body.completed;
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    
    const todoIndex = db.findIndex(t => t.id === numericId);
    if (todoIndex === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    db.splice(todoIndex, 1);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
