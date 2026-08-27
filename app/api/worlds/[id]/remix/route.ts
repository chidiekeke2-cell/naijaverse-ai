import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { demoWorld } from '@/lib/demo/talking-drum';
import { worldSchema } from '@/lib/ai/schema';
import { REMIX_SYSTEM_PROMPT, REMIX_USER_TEMPLATE } from '@/lib/ai/prompts';

const schema = z.object({ instruction: z.string().trim().min(3).max(500), world: z.unknown().optional() });

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = schema.parse(await request.json());
    const { id } = await params;
    const supplied = body.world ? worldSchema.safeParse(body.world) : null;
    const baseWorld = supplied?.success ? supplied.data : id === 'demo' || id === demoWorld.id ? demoWorld : null;
    if (!baseWorld) return NextResponse.json({ error: 'World not found.' }, { status: 404 });
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify({ model: process.env.AI_MODEL || 'gpt-4o-mini', temperature: 0.7, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: REMIX_SYSTEM_PROMPT }, { role: 'user', content: REMIX_USER_TEMPLATE(JSON.stringify(baseWorld), body.instruction) }] }) });
      if (response.ok) {
        const data = await response.json();
        const parsed = worldSchema.safeParse(JSON.parse(data.choices?.[0]?.message?.content || '{}'));
        if (parsed.success) return NextResponse.json({ world: parsed.data, demo: false });
      }
    }
    const lower = body.instruction.toLowerCase();
    const remix = { ...baseWorld, description: `${baseWorld.description} Remix: ${body.instruction}`, title: lower.includes('drum') ? `${baseWorld.title} — Remixed` : `${baseWorld.title} — Remix` };
    return NextResponse.json({ world: remix, demo: true });
  } catch {
    return NextResponse.json({ error: 'Please provide a valid remix instruction.' }, { status: 400 });
  }
}
