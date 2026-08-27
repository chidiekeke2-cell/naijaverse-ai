import Link from "next/link";
import { getDemoGeneratedWorld } from "@/lib/demo/generated-world";

export default async function WorldPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const world = getDemoGeneratedWorld();
  const isDemo = id === "demo" || id === "demo-talking-drum";

  if (!isDemo) return <main className="min-h-screen grid place-items-center bg-[#f7f4ec] p-6"><div className="text-center"><h1 className="text-3xl font-black">World not found</h1><Link href="/create" className="mt-5 inline-block rounded-full bg-[#123d29] px-6 py-3 font-bold text-white">Create a world</Link></div></main>;

  return <main className="min-h-screen bg-[#f7f4ec] text-[#10261b]">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><Link href="/" className="text-xl font-black">NaijaVerse<span className="text-[#b77b12]"> AI</span></Link><Link href="/create" className="rounded-full border border-black/10 bg-white px-5 py-2.5 font-bold">Create another</Link></nav>
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-10"><div className="rounded-[2rem] bg-[#123d29] p-8 text-white md:p-14"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{world.genre} · {world.setting}</span><h1 className="mt-7 max-w-3xl text-5xl font-black tracking-tight md:text-7xl">{world.title}</h1><p className="mt-5 max-w-2xl text-lg text-white/75">{world.description}</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/play/demo" className="rounded-full bg-[#e5b84b] px-7 py-4 font-black text-[#10261b]">▶ Play World</Link><Link href="/create" className="rounded-full bg-white/10 px-7 py-4 font-bold">✨ Remix World</Link></div></div>
    <div className="mt-8 grid gap-6 md:grid-cols-3"><div className="rounded-3xl bg-white p-7 md:col-span-2"><p className="text-xs font-bold uppercase tracking-widest text-[#b77b12]">Story</p><h2 className="mt-2 text-2xl font-black">{world.logline}</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{world.characters.map(c => <div key={c.id} className="rounded-2xl bg-[#f7f4ec] p-5"><p className="font-black">{c.name}</p><p className="text-sm text-black/55">{c.role}</p><p className="mt-2 text-sm">{c.description}</p></div>)}</div></div><div className="rounded-3xl bg-white p-7"><p className="text-xs font-bold uppercase tracking-widest text-[#b77b12]">Soundtrack</p><h2 className="mt-2 text-xl font-black">{world.music.title}</h2><p className="mt-3 text-sm text-black/60">{world.music.description}</p><div className="mt-6 rounded-2xl bg-[#123d29] p-4 text-white"><span className="text-sm">Mood</span><p className="font-bold">{world.music.mood}</p></div></div></div></section>
  </main>;
}
