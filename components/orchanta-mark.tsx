'use client';

// Orchanta studio mark — the "A·Loop" logo. Monochrome (inherits currentColor) so it
// sits cleanly in the host product's nav/footer without clashing.
export function OrchantaMark({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const px = size === 'md' ? 20 : 16;
  const textSize = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <span className="group relative inline-flex items-center gap-2 select-none">
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="text-white/45 transition-colors duration-300 group-hover:text-white/90"
      >
        <path d="M24 7 A17 17 0 1 1 9.7 15" fill="none" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M24 1.5 L24 12.5 L33 7 Z" fill="currentColor" />
        <circle cx="24" cy="24" r="5.4" fill="currentColor" />
      </svg>
      <span className={`relative ${textSize} font-medium tracking-wide text-white/45 transition-colors duration-300 group-hover:text-white/90`}>
        Orchanta
      </span>
    </span>
  );
}
