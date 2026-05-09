'use client';

export function GithubMark({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const iconSize = size === 'md' ? 'w-[18px] h-[18px]' : 'w-4 h-4';
  const textSize = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <span className="group relative inline-flex items-center gap-2 cursor-pointer select-none">
      <span
        aria-hidden
        className="absolute -inset-2.5 rounded-full bg-emerald-500/0 blur-md transition-all duration-500 group-hover:bg-emerald-500/[0.10]"
      />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={`relative ${iconSize} text-white/45 transition-all duration-300 ease-out group-hover:text-emerald-400 group-hover:-rotate-[10deg] group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.55)]`}
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.97 10.97 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.26 5.65.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
      <span className={`relative ${textSize} font-medium tracking-wide text-white/45 transition-colors duration-300 group-hover:text-white/90`}>
        naumanAhmed3
        <span className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 transition-all duration-500 ease-out group-hover:w-full" />
      </span>
    </span>
  );
}
