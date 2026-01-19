"use client";

// src/components/About.tsx
import { useEffect, useRef } from "react";

export default function About() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target); // ✅ animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <section id="about" className="mt-20">
      {/* Header */}
      <div
        ref={addToRefs}
        className="reveal flex items-end justify-between gap-6"
      >
        <div>
          <p className="text-xs tracking-[0.3em] text-violet-300/70">
            PROFILE / OVERVIEW
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">About</h2>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(180,120,255,0.8)]" />
          ACTIVE • ML ENGINEER
        </div>
      </div>

      {/* Glass panel */}
      <div
        ref={addToRefs}
        className="reveal reveal-delay-1 relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
      >
        {/* Violet glow + scanlines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(180,120,255,0.55)_1px,transparent_1px)] bg-[length:100%_4px]" />
          </div>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {/* Text */}
          <div>
            <p className="text-white/70 leading-relaxed">
              I’m an ML Engineer focused on building practical systems—models
              that perform well not just in notebooks, but in real-world
              production. I enjoy working on problem framing, feature
              engineering, evaluation, and deploying fast inference pipelines.
            </p>

            {/* Better “skill chips” */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { tag: "Model evaluation", meta: "reliability + metrics" },
                { tag: "Vision pipelines", meta: "fast CV systems" },
                { tag: "Feature engineering", meta: "signal discovery" },
                { tag: "Deployment-ready ML", meta: "ship to prod" },
              ].map((item) => (
                <FocusChip key={item.tag} tag={item.tag} meta={item.meta} />
              ))}
            </div>
          </div>

          {/* Cards (staggered reveal) */}
          <div className="grid gap-4">
            <div ref={addToRefs} className="reveal reveal-delay-1">
              <AboutCard3D
                label="Focus"
                value="Applied Machine Learning"
                hint="framing → training → measurable results"
                accent="from-violet-400/20 to-transparent"
              />
            </div>

            <div ref={addToRefs} className="reveal reveal-delay-2">
              <AboutCard3D
                label="Strength"
                value="Computer Vision"
                hint="detection • segmentation • tracking"
                accent="from-fuchsia-400/20 to-transparent"
              />
            </div>

            <div ref={addToRefs} className="reveal reveal-delay-3">
              <AboutCard3D
                label="Goal"
                value="Deploy ML Products"
                hint="latency • robustness • scale"
                accent="from-indigo-400/20 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------
   Better chips (premium + micro interaction)
-------------------------------------------- */
function FocusChip({ tag, meta }: { tag: string; meta: string }) {
  return (
    <span className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-white/7">
      {/* glow highlight */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <span className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-white/10 to-transparent" />
        <span className="absolute -inset-10 bg-violet-500/10 blur-2xl" />
      </span>

      <span className="relative z-10 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400/80 shadow-[0_0_10px_rgba(180,120,255,0.65)]" />
        <span className="font-medium">{tag}</span>
        <span className="hidden sm:inline text-white/35">• {meta}</span>
      </span>
    </span>
  );
}

/* -------------------------------------------
   3D Reactive Card (tilt + light follow)
-------------------------------------------- */
function AboutCard3D({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 -> width
    const y = e.clientY - rect.top; // 0 -> height

    // normalize -0.5 to 0.5
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;

    // tilt strength
    const rotateY = nx * 10; // left-right
    const rotateX = -ny * 10; // up-down

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-violet-300/35 hover:bg-black/35 will-change-transform"
      style={
        {
          transform:
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* Accent gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${accent} opacity-0 transition duration-300 group-hover:opacity-100`}
      />

      {/* reactive light-follow blob */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            left: "var(--mx)",
            top: "var(--my)",
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, rgba(180,120,255,0.20), rgba(0,0,0,0) 60%)",
          }}
        />
      </div>

      {/* top shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs tracking-[0.25em] text-white/40">{label}</p>

        <p className="mt-2 text-base font-medium text-white/90">{value}</p>

        <p className="mt-1 text-xs text-white/40 transition group-hover:text-white/55">
          {hint}
        </p>

        {/* tiny corner indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/90 shadow-[0_0_12px_rgba(180,120,255,0.75)]" />
          <span className="text-[11px] text-white/40 group-hover:text-white/55">
            hover-reactive
          </span>
        </div>
      </div>

      {/* subtle inner border for “depth” */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 transition group-hover:ring-white/10" />
    </div>
  );
}
