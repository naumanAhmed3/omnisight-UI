'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { OrchantaMark } from './orchanta-mark';

export function Nav() {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith('/demo');

  return (
    <nav className="border-b border-white/[0.06] backdrop-blur-md bg-[#0a0a0f]/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" aria-label="OmniSight — home">
          <OrchantaMark />
        </Link>
        {isDemo ? (
          <Link href="/" className="text-xs font-medium text-white/30 hover:text-white/60 transition-colors">
            ← Back to Overview
          </Link>
        ) : (
          <Link href="/demo/live" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            Try Demo →
          </Link>
        )}
      </div>
    </nav>
  );
}
