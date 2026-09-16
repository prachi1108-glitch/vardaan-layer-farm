import { CountUp } from "@/components/motion/CountUp";

export type TrustStatItem = {
  value: string;
  label: string;
  note?: string;
};

export function TrustBar({ stats }: { stats: TrustStatItem[] }) {
  if (stats.length === 0) return null;
  return (
    <section className="bg-surface-offwhite border-b egg-border py-10 shadow-ambient">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
          {stats.map((s) => (
            <div
              key={s.label}
              className="reveal flex flex-col items-center md:items-start pt-4 md:pt-0 md:px-6"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-metric-display text-metric-display text-on-surface font-bold">
                  <CountUp value={s.value} />
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              </div>
              <span className="font-body-sm text-body-sm text-tertiary font-medium mt-1 text-center md:text-left">
                {s.label}
              </span>
              {s.note ? (
                <span className="font-label-caps text-label-caps text-on-surface-variant mt-0.5 text-center md:text-left">
                  {s.note}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
