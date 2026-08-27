import Link from 'next/link';
import { ArrowRight, Compass, Gamepad2, Sparkles } from 'lucide-react';
import { demoWorld } from '@/lib/demo/talking-drum';

const worlds = [
  demoWorld,
  { ...demoWorld, id: 'future-lagos', title: 'Neon Lagos: The Last Signal', description: 'A courier follows a mysterious radio signal through a futuristic Lagos.', setting: 'Future Lagos', genre: 'Sci-Fi' },
  { ...demoWorld, id: 'forest-of-whispers', title: 'The Forest of Whispers', description: 'A young explorer enters a living forest where every choice changes the path home.', setting: 'Fantasy Africa', genre: 'Fantasy' },
];

export default function ExplorePage() {
  return (
    <main className="page-shell">
      <section className="container section-pad">
        <div className="eyebrow"><Compass size={16} /> Explore worlds</div>
        <h1 className="display">Stories made to be <span>played.</span></h1>
        <p className="lede">Discover interactive worlds created with AI and inspired by African imagination.</p>
        <div className="filter-row">
          {['All','Adventure','Mystery','Fantasy','Sci-Fi'].map((filter) => <button className="chip" key={filter}>{filter}</button>)}
        </div>
        <div className="world-grid">
          {worlds.map((world) => (
            <article className="world-card" key={world.id}>
              <div className="world-art"><Sparkles size={30} /><span>{world.setting}</span></div>
              <div className="world-card-body">
                <div className="card-meta"><span>{world.genre}</span><span>AI world</span></div>
                <h2>{world.title}</h2>
                <p>{world.description}</p>
                <Link className="button button-small" href={`/world/${world.id}`}>Enter world <ArrowRight size={16}/></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
