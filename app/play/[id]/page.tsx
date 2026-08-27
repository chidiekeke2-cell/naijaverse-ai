'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
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
  const choose = (choice: PlayScene['choices'][number]) => setState(s => ({ ...s, currentSceneId: choice.nextSceneId, inventory: choice.givesItemId ? [...new Set([...s.inventory, choice.givesItemId])] : s.inventory, visited: [...s.visited, s.currentSceneId] }));
  const reset = () => setState({ currentSceneId: world.scenes[0].id, inventory: [], visited: [] });

  return <main className="min-h-screen bg-[#10261b] p-5 text-white"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between py-5"><Link href="/" className="text-xl font-black">NaijaVerse <span className="text-[#e8c66c]">AI</span></Link><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{id === 'generated' ? 'AI WORLD' : 'DEMO MODE'}</span></div><div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#e8c66c] transition-all" style={{ width: `${Math.min(100, ((state.visited.length + 1) / Math.max(world.scenes.length, 1)) * 100)}%` }}/></div><section className="overflow-hidden rounded-[2rem] bg-[#1b4933] shadow-2xl"><div className="p-8 md:p-12"><p className="text-sm font-bold tracking-widest text-[#e8c66c]">{world.title} · {world.setting}</p><h1 className="mt-3 text-4xl font-black md:text-6xl">{scene.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{scene.narration}</p>{state.inventory.length > 0 && <div className="mt-5 text-sm text-[#e8c66c]">Inventory: {state.inventory.join(', ')}</div>}{ending ? <div className="mt-10 rounded-2xl bg-white p-6 text-[#10261b]"><p className="text-sm font-bold uppercase tracking-widest text-[#b77b12]">Adventure complete</p><h2 className="mt-2 text-2xl font-black">{scene.title}</h2><p className="mt-2 text-[#56645b]">You reached the end of this path.</p><button onClick={reset} className="mt-6 rounded-full bg-[#123d29] px-6 py-3 font-bold text-white">Play Again</button></div> : <><h2 className="mt-10 text-xl font-black">What do you do?</h2><div className="mt-4 grid gap-3">{scene.choices.map(choice => <button key={choice.id} onClick={() => choose(choice)} className="rounded-2xl bg-white/10 p-5 text-left font-bold transition hover:bg-white hover:text-[#10261b]">{choice.text}</button>)}</div></>}</div></section></div></main>;
}
