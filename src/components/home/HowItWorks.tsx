const steps = [
  {
    n: "01",
    title: "Tell Us Your Requirement",
    body: "Specify your weekly or daily volume in crates, preferred egg grade (Medium/Large/XL), and destination delivery pin code.",
  },
  {
    n: "02",
    title: "Receive Custom Commercial Quote",
    body: "We issue a transparent wholesale rate sheet and guaranteed delivery schedule within 4 business hours.",
  },
  {
    n: "03",
    title: "Establish Regular Supply",
    body: "Begin scheduled delivery cycles backed by an assigned dedicated account manager and real-time dispatch tracking.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-space-2xl md:py-space-3xl bg-surface-offwhite border-y egg-border">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="font-label-caps text-label-caps text-secondary">
            STREAMLINED ONBOARDING
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mt-2">
            Simple, dependable commercial procurement
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Getting started with Vardaan Layer Farm requires no complex tender delays.
            We set up commercial accounts rapidly.
          </p>
        </div>

        <div className="relative">
          {/* Connecting guide */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-0.5 bg-primary-container"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {steps.map((s) => (
              <div key={s.n} className="reveal flex flex-col items-center text-center">
                <span className="w-12 h-12 rounded-lg bg-on-surface text-primary-container font-label-md text-label-md font-bold flex items-center justify-center shadow-ambient relative z-10">
                  {s.n}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-5 mb-2">
                  {s.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
