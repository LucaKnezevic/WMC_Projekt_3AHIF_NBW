import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Feedback erhalten:', data);
  return NextResponse.json({ message: 'Erfolg' }, { status: 200 });
}
