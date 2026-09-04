'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { talkingDrum } from '@/lib/demo/talking-drum';
import type { GameState, World } from '@/types/game';
import type { GeneratedWorld } from '@/lib/ai/schema';

type PlayScene = World['scenes'][number];

export default function Play({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [generated, setGenerated] = useState<World | null>(null);
  const [state, setState] = useState<GameState>({ currentSceneId: 'discovery', inventory: [], visited: [] });

  useEffect(() => {
    if (id !== 'generated') return;
    try {
      const raw = sessionStorage.getItem('naijaverse:last-world');
      if (!raw) return;
      const world = JSON.parse(raw) as GeneratedWorld;
      const scenes: World['scenes'] = world.scenes.map(scene => ({ id: scene.id, title: scene.title, narration: scene.narration || scene.description || '', choices: scene.choices.map(choice => ({ id: choice.id, text: choice.text, nextSceneId: choice.nextSceneId })) }));
      setGenerated({ id: 'generated', title: world.title, logline: world.logline, setting: world.setting, genre: world.genre, scenes, items: [], endings: world.endings });
    } catch { setGenerated(null); }
  }, [id]);

  const world = id === 'generated' ? generated : talkingDrum;
  const scene: PlayScene | undefined = useMemo(() => world?.scenes.find(s => s.id === state.currentSceneId), [world, state.currentSceneId]);

  if (!world || !scene) return <main className="min-h-screen grid place-items-center bg-[#10261b] p-6 text-white"><div className="text-center"><p className="text-sm uppercase tracking-widest text-[#e8c66c]">NaijaVerse AI</p><h1 className="mt-3 text-3xl font-black">Your world is not ready yet.</h1><Link href="/create" className="mt-6 inline-block rounded-full bg-[#e8c66c] px-6 py-3 font-bold text-[#10261b]">Create a world</Link></div></main>;

  const ending = scene.choices.length === 0;
  const progress = Math.min(100, ((state.visited.length + 1) / Math.max(world.scenes.length, 1)) * 100);
  const choose = (choice: PlayScene['choices'][number]) => setState(s => ({ ...s, currentSceneId: choice.nextSceneId, inventory: choice.givesItemId ? [...new Set([...s.inventory, choice.givesItemId])] : s.inventory, visited: [...s.visited, s.currentSceneId] }));
  const reset = () => setState({ currentSceneId: world.scenes[0].id, inventory: [], visited: [] });

  return <main className="min-h-screen overflow-hidden bg-[#0a1d14] p-4 text-white md:p-6"><div className="mx-auto max-w-5xl">
    <header className="flex items-center justify-between py-4 md:py-5"><Link href="/" className="flex items-center gap-2 text-lg font-black"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e8c66c] text-[#10261b]"><Sparkles size={15}/></span>NaijaVerse<span className="text-[#e8c66c]"> AI</span></Link><div className="flex items-center gap-3"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black tracking-[.14em] text-white/60">{id === 'generated' ? 'AI WORLD' : 'DEMO MODE'}</span><Link href="/create" className="hidden text-xs font-bold text-white/60 hover:text-white sm:block">New world</Link></div></header>
    <div className="mb-5"><div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-[.16em] text-white/40"><span>Story progress</span><span>{Math.round(progress)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#e8c66c] transition-all duration-700" style={{ width: `${progress}%` }}/></div></div>
    <section className="fade-up overflow-hidden rounded-[2rem] border border-white/10 bg-[#123d29] shadow-2xl shadow-black/30"><div className="p-6 md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[.16em] text-[#e8c66c]">{world.title} · {world.setting}</p>{state.inventory.length > 0 && <span className="rounded-full bg-[#e8c66c]/10 px-3 py-1 text-xs font-bold text-[#e8c66c]">🎒 {state.inventory.length} item{state.inventory.length===1?'':'s'}</span>}</div>
      <div className="mt-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-white/35">Scene {String(state.visited.length + 1).padStart(2,'0')}</p><h1 className="mt-2 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">{scene.title}</h1><p className="mt-7 text-lg leading-8 text-white/75 md:text-xl">{scene.narration}</p></div>
      {ending ? <div className="mt-10 rounded-2xl bg-[#fffaf0] p-6 text-[#10261b] md:p-8"><p className="text-xs font-black uppercase tracking-[.16em] text-[#b77b12]">Adventure complete</p><h2 className="mt-2 text-2xl font-black">You reached the end of this path.</h2><p className="mt-2 text-sm leading-6 text-[#617067]">Try another route to discover how different choices change the story.</p><button onClick={reset} className="button mt-6 rounded-full"><RotateCcw size={17}/> Play Again</button></div> : <div className="mt-10"><h2 className="text-sm font-black uppercase tracking-[.16em] text-white/50">What do you do?</h2><div className="mt-4 grid gap-3">{scene.choices.map((choice,index) => <button key={choice.id} onClick={() => choose(choice)} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4 text-left font-bold transition duration-200 hover:-translate-y-0.5 hover:border-[#e8c66c]/50 hover:bg-[#e8c66c] hover:text-[#10261b] md:p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-xs text-white/50 group-hover:bg-[#10261b]/10 group-hover:text-[#10261b]">{index+1}</span><span>{choice.text}</span><span className="ml-auto text-white/30 transition group-hover:translate-x-1 group-hover:text-[#10261b]">→</span></button>)}</div></div>}
    </div></section>
    <div className="flex items-center justify-between py-5 text-xs text-white/35"><Link href="/" className="flex items-center gap-1 hover:text-white"><ArrowLeft size={14}/> Exit</Link><span>Every choice changes the journey.</span></div>
  </div></main>;
}
