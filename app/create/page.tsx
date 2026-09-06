'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, Sparkles, WandSparkles } from 'lucide-react';

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

  return <main className="min-h-screen overflow-hidden bg-[#f7f4ec] px-5 py-6 text-[#10261b] md:px-8 md:py-8">
    <div className="mx-auto max-w-5xl"><div className="flex items-center justify-between"><Link href="/" className="text-xl font-black">NaijaVerse<span className="text-[#b77b12]"> AI</span></Link><span className="hidden rounded-full border border-[#dfe4db] bg-white px-4 py-2 text-xs font-bold text-[#617067] sm:block">CREATION STUDIO</span></div>
      <div className="mt-12 grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start md:mt-20">
        <div className="fade-up md:sticky md:top-8"><div className="eyebrow"><Sparkles size={16}/> Create a world</div><h1 className="display">Give your idea a <span>place to play.</span></h1><p className="lede">Write naturally. NaijaVerse handles the world-building, branching choices and playable structure.</p><div className="mt-8 hidden rounded-3xl border border-[#dfe4db] bg-white/60 p-5 md:block"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef4ed] text-[#0d5c3b]"><WandSparkles size={19}/></div><div><p className="font-black">Hackathon-ready flow</p><p className="text-sm text-[#617067]">Idea → AI → playable world</p></div></div></div></div>
        <form onSubmit={submit} className="fade-up-delay rounded-[2rem] border border-[#dfe4db] bg-white p-5 shadow-xl shadow-[#10261b]/5 md:p-8">
          <div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#b77b12]">01 · Story seed</p><h2 className="mt-1 text-2xl font-black">What should happen?</h2></div><span className="rounded-full bg-[#eef4ed] px-3 py-1 text-xs font-bold text-[#0d5c3b]">{idea.length}/2000</span></div>
          <label className="block"><span className="font-bold">Your story idea</span><textarea aria-label="Story idea" value={idea} onChange={e => setIdea(e.target.value)} maxLength={2000} className="mt-2 min-h-48 w-full rounded-2xl border border-[#dfe4db] bg-[#fffdf8] p-4 leading-7 outline-none transition focus:border-[#0d5c3b] focus:ring-4 focus:ring-[#0d5c3b]/10" placeholder="A girl finds a mysterious object..."/></label>
          <div className="mt-8 grid gap-5 md:grid-cols-2"><label className="block"><span className="text-sm font-bold">Setting</span><select value={setting} onChange={e => setSetting(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe4db] bg-[#fffdf8] p-3 outline-none focus:border-[#0d5c3b]"><option>Enugu</option><option>Lagos</option><option>Kano</option><option>Abuja</option><option>Future Africa</option><option>Fantasy Africa</option></select></label><label className="block"><span className="text-sm font-bold">Genre</span><select value={genre} onChange={e => setGenre(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe4db] bg-[#fffdf8] p-3 outline-none focus:border-[#0d5c3b]"><option>Adventure</option><option>Mystery</option><option>Fantasy</option><option>Sci-Fi</option><option>Drama</option></select></label></div>
          {error && <p role="alert" className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <div className="mt-8 rounded-2xl bg-[#f7f4ec] p-4 text-sm text-[#617067]"><strong className="text-[#10261b]">Tip:</strong> Include a character, a place and something mysterious. The more specific the seed, the richer the world.</div>
          <button disabled={loading || idea.trim().length < 10} className="button mt-5 w-full rounded-2xl py-4 text-base">{loading ? <><Loader2 size={19} className="spin"/> Creating your world…</> : <>Generate Playable World <ArrowRight size={19}/></>}</button>
          <p className="mt-3 text-center text-xs text-[#617067]">You can remix the result after generation.</p>
        </form>
      </div>
    </div>
  </main>;
}
