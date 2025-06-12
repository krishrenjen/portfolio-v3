'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-fit text-white flex items-center justify-center shadow-md">
      <div className="mx-auto px-6 py-6 max-w-2xl w-full flex items-center justify-between gap-6 font-normal">
        <h1 className="text-l font-bold">krishrenjen.com</h1>
        <div className="flex items-center justify-end gap-6">
          <Link href="/" className="hover:text-brand-pink transition-colors text-l">Home</Link>
          <Link href="/projects" className="hover:text-brand-pink transition-colors text-l">Projects</Link>
        </div>
      </div>
    </nav>
  );
}
