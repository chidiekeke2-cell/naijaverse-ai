'use client';

import { FormEvent, use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function RemixPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [instruction, setInstruction] = useState('Make the villain a talking leopard and change the soundtrack to Afrobeats.');
  const [result, setResult] = useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setResult(null);
    try {
      let world: unknown = undefined;
      if (id === 'generated') {
        const raw = sessionStorage.getItem('naijaverse:last-world');
        if (raw) world = JSON.parse(raw);
      }
      const res = await fetch(`/api/worlds/${id}/remix`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ instruction, world }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Remix failed');
      setResult(data.world);
      sessionStorage.setItem('naijaverse:last-world', JSON.stringify(data.world));
    } catch (error) { setResult({ title: 'Remix unavailable', description: error instanceof Error ? error.message : 'Try again.' }); }
    finally { setLoading(false); }
  }

  return <main className="page-shell"><section className="container narrow section-pad">
    <Link href={id === 'generated' ? '/world/generated' : `/world/${id}`} className="back-link"><ArrowLeft size={16}/> Back to world</Link>
    <div className="eyebrow"><Sparkles size={16}/> Remix engine</div>
    <h1 className="display">Change the world with <span>words.</span></h1>
    <p className="lede">Tell NaijaVerse what you want changed. The AI keeps the story coherent while reshaping your experience.</p>
    <form onSubmit={submit} className="remix-form"><label htmlFor="instruction">Your instruction</label><textarea id="instruction" value={instruction} onChange={e => setInstruction(e.target.value)} rows={6} maxLength={500}/><div className="form-footer"><span>{instruction.length}/500</span><button className="button" disabled={loading || instruction.trim().length < 3}>{loading ? <><Loader2 className="spin" size={18}/> Remixing…</> : <>✨ Remix world <ArrowRight size={17}/></>}</button></div></form>
    {result && <div className="result-panel"><div className="eyebrow">New version</div><h2>{result.title}</h2><p>{result.description}</p><Link href={id === 'generated' ? '/world/generated' : `/play/${id}`} className="button button-small">View remix <ArrowRight size={15}/></Link></div>}
  </section></main>;
}
