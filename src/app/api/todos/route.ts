import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };

    db.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
