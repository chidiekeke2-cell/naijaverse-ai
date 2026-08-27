import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { demoWorld } from '@/lib/demo/talking-drum';

const schema = z.object({ instruction: z.string().trim().min(3).max(500) });

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = schema.parse(await request.json());
    const { id } = await params;
    if (id !== demoWorld.id) {
      return NextResponse.json({ error: 'World not found in demo mode.' }, { status: 404 });
    }
    const instruction = body.instruction;
    const lower = instruction.toLowerCase();
    const remix = { ...demoWorld, description: `${demoWorld.description} Remix: ${instruction}`, title: lower.includes('drum') ? 'The Talking Drum — Remixed' : `${demoWorld.title} — Remixed` };
    return NextResponse.json({ world: remix, demo: true });
  } catch {
    return NextResponse.json({ error: 'Please provide a valid remix instruction.' }, { status: 400 });
  }
}
