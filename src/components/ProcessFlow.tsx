import type { ReactNode } from "react";

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
};

/** Horizontal (desktop) / vertical (mobile) numbered flow with connectors. */
export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
      {steps.map((step, i) => (
        <li key={step.n} className="relative flex flex-col">
          {/* connector line to next step (desktop) */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className="absolute left-1/2 top-7 hidden h-px w-full bg-line lg:block"
            />
          ) : null}
          <div className="relative z-10 flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper/60 p-5 lg:items-center lg:text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-forest/8 text-forest">
              {step.icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {step.n}
            </span>
            <h3 className="text-lg leading-snug">{step.title}</h3>
            <p className="text-sm leading-relaxed text-stone">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
