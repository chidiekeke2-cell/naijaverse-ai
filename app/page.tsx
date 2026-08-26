import Link from 'next/link';

export default function Home() {
  return <main className="min-h-screen bg-[#f7f4ec] text-[#10261b]">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-2xl font-black tracking-tight">NaijaVerse<span className="text-[#d9a441]"> AI</span></Link>
      <div className="hidden gap-7 text-sm font-medium md:flex"><Link href="/create">Create</Link><a href="#how">How it works</a><a href="#why">Why NaijaVerse</a></div>
      <Link href="/create" className="rounded-full bg-[#123d29] px-5 py-3 text-sm font-bold text-white">Create World</Link>
    </nav>
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:items-center md:pt-24">
      <div><p className="mb-5 inline-flex rounded-full border border-[#d9a441]/40 bg-white px-4 py-2 text-sm font-semibold">AI-powered African interactive storytelling</p>
      <h1 className="text-5xl font-black leading-[.98] tracking-tight md:text-7xl">Turn your imagination into a <span className="text-[#b77b12]">playable world.</span></h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-[#4d5b52]">Create interactive stories, characters, choices and adventures from one idea. Imagine it. Generate it. Remix it. Play it.</p>
      <div className="mt-8 flex flex-wrap gap-4"><Link href="/create" className="rounded-full bg-[#123d29] px-7 py-4 font-bold text-white shadow-lg">✨ Create Your World</Link><Link href="/play/demo" className="rounded-full border border-[#123d29]/20 bg-white px-7 py-4 font-bold">▶ Try Demo</Link></div></div>
      <div className="rounded-[2rem] bg-[#123d29] p-5 text-white shadow-2xl"><div className="rounded-[1.5rem] bg-[#1d5037] p-7"><p className="text-sm text-[#e8c66c]">THE TALKING DRUM</p><h2 className="mt-2 text-3xl font-black">The secret beneath the old house.</h2><p className="mt-4 leading-7 text-white/75">A mysterious rhythm comes from beneath the floor. Your choices decide what happens next.</p><div className="mt-7 space-y-3"><button className="w-full rounded-xl bg-white/10 p-4 text-left">🥁 Pick up the drum</button><button className="w-full rounded-xl bg-white/10 p-4 text-left">🔍 Examine the symbols</button><button className="w-full rounded-xl bg-white/10 p-4 text-left">🚪 Leave the room</button></div></div></div>
    </section>
    <section id="how" className="mx-auto max-w-6xl px-6 py-20"><p className="text-sm font-bold uppercase tracking-widest text-[#b77b12]">How it works</p><h2 className="mt-3 text-4xl font-black">One idea. A whole world.</h2><div className="mt-10 grid gap-5 md:grid-cols-4">{[['01','Imagine','Describe your story idea.'],['02','Generate','AI builds the world and characters.'],['03','Remix','Change anything with natural language.'],['04','Play','Step inside your creation.']].map(([n,t,d])=><div key={n} className="rounded-3xl bg-white p-7 shadow-sm"><span className="text-sm font-bold text-[#b77b12]">{n}</span><h3 className="mt-8 text-xl font-black">{t}</h3><p className="mt-2 text-[#66736a]">{d}</p></div>)}</div></section>
  </main>;
}
