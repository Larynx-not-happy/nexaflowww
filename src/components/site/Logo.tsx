export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M9 23V9l14 14V9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        className="text-primary-foreground"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">NexaFlow</span>
    </span>
  );
}
