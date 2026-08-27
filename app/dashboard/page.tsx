import Link from 'next/link';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';
import { demoWorld } from '@/lib/demo/talking-drum';

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <section className="container section-pad">
        <div className="dashboard-head">
          <div><div className="eyebrow"><Sparkles size={16}/> Creator Studio</div><h1 className="display">Your worlds.</h1><p className="lede">Build, remix and play everything you create.</p></div>
          <Link className="button" href="/create"><Plus size={18}/> Create world</Link>
        </div>
        <div className="stats-grid"><div><strong>3</strong><span>Worlds</span></div><div><strong>8</strong><span>Scenes</span></div><div><strong>24</strong><span>Choices played</span></div></div>
        <div className="dashboard-grid">
          <article className="dashboard-card"><div className="world-art large"><Sparkles size={36}/></div><div className="world-card-body"><div className="card-meta"><span>Published</span><span>Adventure</span></div><h2>{demoWorld.title}</h2><p>{demoWorld.description}</p><div className="action-row"><Link className="button button-small" href={`/play/${demoWorld.id}`}>Play <ArrowRight size={15}/></Link><Link className="button ghost button-small" href={`/world/${demoWorld.id}`}>Manage</Link></div></div></article>
          <article className="empty-card"><div className="empty-icon"><Plus/></div><h2>Create your next world</h2><p>Start with one sentence. NaijaVerse handles the rest.</p><Link href="/create" className="text-link">Start creating <ArrowRight size={15}/></Link></article>
        </div>
      </section>
    </main>
  );
}
