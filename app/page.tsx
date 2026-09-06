import Link from 'next/link';
import { ArrowRight, Sparkles, WandSparkles, Gamepad2, Share2 } from 'lucide-react';

const steps = [
  ['01','Imagine','Describe a story idea in your own words.'],
  ['02','Generate','AI shapes it into characters, scenes and choices.'],
  ['03','Remix','Change the world without rebuilding it from scratch.'],
  ['04','Play','Step inside the story and make the next move.'],
];

export default function Home() {
  return <main className="min-h-screen overflow-hidden bg-[#f7f4ec] text-[#10261b]">
    <nav className="container flex items-center justify-between py-6">
      <Link href="/" className="text-xl font-black tracking-tight md:text-2xl">NaijaVerse<span className="text-[#b77b12]"> AI</span></Link>
      <div className="hidden items-center gap-7 text-sm font-bold md:flex"><Link href="/create" className="transition hover:text-[#0d5c3b]">Create</Link><a href="#how" className="transition hover:text-[#0d5c3b]">How it works</a><a href="#why" className="transition hover:text-[#0d5c3b]">Why NaijaVerse</a></div>
      <Link href="/create" className="button rounded-full px-5 py-3 text-sm">Create World <ArrowRight size={16}/></Link>
    </nav>

    <section className="container relative grid gap-12 pb-24 pt-12 md:grid-cols-[1.02fr_.98fr] md:items-center md:pt-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#e8c66c]/20 blur-3xl" />
      <div className="relative fade-up">
        <div className="eyebrow"><Sparkles size={15}/> AI-powered African storytelling</div>
        <h1 className="display max-w-3xl">Turn your imagination into a <span>playable world.</span></h1>
        <p className="lede max-w-xl">Create interactive stories, characters, choices and adventures from one idea. Built for African stories, designed for anyone to play.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/create" className="button rounded-full px-7 py-4">Create Your World <ArrowRight size={18}/></Link><Link href="/play/demo" className="button ghost rounded-full border border-[#0d5c3b]/15 bg-white px-7 py-4">▶ Try the Demo</Link></div>
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-bold text-[#617067]"><span>✓ No prompt engineering</span><span>✓ Demo works without API keys</span></div>
      </div>

      <div className="relative fade-up-delay">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#d9a441]/30" />
        <div className="rounded-[2rem] bg-[#102f21] p-2 shadow-2xl shadow-[#10261b]/20 md:rotate-[1deg]">
          <div className="shimmer rounded-[1.6rem] bg-[#174f37] p-7 text-white md:p-9">
            <div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[.18em]">THE TALKING DRUM</span><span className="text-[#e8c66c]">● LIVE STORY</span></div>
            <div className="mt-10"><p className="text-sm font-bold text-[#e8c66c]">SCENE 01 · ENUGU</p><h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">The secret beneath the old house.</h2><p className="mt-4 leading-7 text-white/70">A mysterious rhythm comes from beneath the floor. Your choices decide what happens next.</p></div>
            <div className="mt-7 space-y-3"><div className="rounded-2xl bg-white/10 p-4 font-bold transition hover:bg-white/15">🥁 Pick up the drum <span className="float-slow float-right">→</span></div><div className="rounded-2xl bg-white/10 p-4 font-bold">🔍 Examine the symbols</div><div className="rounded-2xl bg-white/10 p-4 font-bold">🚪 Leave the room</div></div>
            <div className="mt-6 flex items-center justify-between text-xs text-white/45"><span>Choice-driven adventure</span><span>1 / 5 scenes</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="why" className="border-y border-[#dfe4db] bg-white/45"><div className="container grid gap-8 py-12 md:grid-cols-3"><div><p className="text-3xl font-black">AI → Game</p><p className="mt-2 text-sm text-[#617067]">Structured generation turns ideas into playable systems.</p></div><div><p className="text-3xl font-black">African at heart</p><p className="mt-2 text-sm text-[#617067]">Settings, themes and stories inspired by the continent.</p></div><div><p className="text-3xl font-black">Built to demo</p><p className="mt-2 text-sm text-[#617067]">A reliable playable experience, even without external AI services.</p></div></div></section>

    <section id="how" className="container section-pad"><div className="max-w-2xl"><p className="eyebrow">The creative loop</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">One idea. A whole world.</h2><p className="mt-4 text-[#617067]">From a blank page to a branching adventure in minutes.</p></div><div className="mt-10 grid gap-4 md:grid-cols-4">{steps.map(([n,t,d],i)=><div key={n} className={`rounded-3xl border border-[#dfe4db] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${i===0?'fade-up':''}`}><span className="text-sm font-black text-[#b77b12]">{n}</span><div className="mt-8 grid h-10 w-10 place-items-center rounded-xl bg-[#eef4ed] text-[#0d5c3b]">{i===0?<WandSparkles size={19}/>:i===1?<Sparkles size={19}/>:i===2?<Share2 size={19}/>:<Gamepad2 size={19}/>}</div><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-[#617067]">{d}</p></div>)}</div></section>

    <section className="container pb-20"><div className="relative overflow-hidden rounded-[2rem] bg-[#0d5c3b] p-8 text-white md:p-12"><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10"/><p className="relative text-sm font-bold uppercase tracking-[.16em] text-[#e8c66c]">Ready when you are</p><div className="relative mt-3 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><h2 className="max-w-2xl text-3xl font-black md:text-4xl">Your next story could become someone’s next adventure.</h2></div><Link href="/create" className="button pulse-soft w-fit rounded-full border-0 bg-[#e8c66c] px-7 py-4 text-[#10261b] hover:bg-[#f2d77f]">Start Creating <ArrowRight size={18}/></Link></div></div></section>
  </main>;
}
