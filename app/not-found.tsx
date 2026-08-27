import Link from 'next/link';

export default function NotFound() {
  return <main className="min-h-screen grid place-items-center bg-[#f7f4ec] p-6 text-[#10261b]"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-[#b77b12]">NaijaVerse AI</p><h1 className="mt-3 text-5xl font-black">World not found.</h1><p className="mx-auto mt-4 max-w-md text-black/55">That world may have moved or has not been created yet.</p><Link href="/create" className="button mt-7">Create a world</Link></div></main>;
}
