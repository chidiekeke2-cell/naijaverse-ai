'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Sparkles } from 'lucide-react';

const demoIdea = 'A 12-year-old girl discovers a mysterious talking drum beneath an old house in Enugu. The drum contains a secret connected to her missing grandfather.';

export default function Create() {
  const router = useRouter();
  const [idea, setIdea] = useState(demoIdea);
  const [setting, setSetting] = useState('Enugu');
  const [genre, setGenre] = useState('Adventure');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/worlds/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idea, setting, genre, tone: 'Cinematic' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      sessionStorage.setItem('naijaverse:last-world', JSON.stringify(data.world));
      router.push(data.demo ? '/play/demo' : '/world/generated');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not create your world.');
    } finally { setLoading(false); }
  }

  return <main className="min-h-screen bg-[#f7f4ec] px-6 py-10 text-[#10261b]">
    <div className="mx-auto max-w-3xl"><Link href="/" className="font-black">← NaijaVerse AI</Link>
      <div className="mt-16"><div className="eyebrow"><Sparkles size={16}/> Creation Studio</div><h1 className="display">What world will you create?</h1><p className="lede">Start with an idea. NaijaVerse turns it into an interactive adventure.</p>
        <form onSubmit={submit} className="mt-10 space-y-7 rounded-3xl bg-white p-7 shadow-sm">
          <label className="block"><span className="font-bold">Story idea</span><textarea value={idea} onChange={e => setIdea(e.target.value)} maxLength={2000} className="mt-2 min-h-40 w-full rounded-2xl border border-black/10 p-4 outline-none focus:ring-2 focus:ring-[#d9a441]"/><span className="mt-2 block text-right text-xs text-black/45">{idea.length}/2000</span></label>
          <div className="grid gap-5 md:grid-cols-2"><label className="block"><span className="font-bold">Setting</span><select value={setting} onChange={e => setSetting(e.target.value)} className="mt-2 w-full rounded-xl border p-3"><option>Enugu</option><option>Lagos</option><option>Kano</option><option>Abuja</option><option>Future Africa</option><option>Fantasy Africa</option></select></label><label className="block"><span className="font-bold">Genre</span><select value={genre} onChange={e => setGenre(e.target.value)} className="mt-2 w-full rounded-xl border p-3"><option>Adventure</option><option>Mystery</option><option>Fantasy</option><option>Sci-Fi</option><option>Drama</option></select></label></div>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button disabled={loading || idea.trim().length < 10} className="button w-full py-4">{loading ? <><Loader2 size={18} className="spin"/> Creating your world…</> : <>✨ Generate World</>}</button>
        </form>
      </div>
    </div>
  </main>;
}
