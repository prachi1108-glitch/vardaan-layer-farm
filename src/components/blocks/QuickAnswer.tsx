import type { ReactNode } from "react";

/** AEO "Quick answer" box (PRD §5.4): a 40–60 word direct answer on Sky. */
export function QuickAnswer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <aside aria-label="Quick answer" className={`rounded-[20px] bg-sky p-6 ${className}`}>
      <p className="eyebrow mb-2 text-cocoa">Quick answer</p>
      <div className="text-[16px] leading-relaxed text-cocoa">{children}</div>
    </aside>
  );
}
