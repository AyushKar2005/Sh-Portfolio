"use client";

import React, { useEffect, useRef } from "react";

const SKILLS = [
  { name: "Python", group: "Core" },
  { name: "PyTorch", group: "Frameworks" },
  { name: "TensorFlow", group: "Frameworks" },
  { name: "Scikit-learn", group: "ML Tools" },
  { name: "Pandas", group: "Data" },
  { name: "NumPy", group: "Data" },
  { name: "OpenCV", group: "Computer Vision" },
  { name: "NLP", group: "Domains" },
  { name: "Computer Vision", group: "Domains" },
  { name: "MLOps Basics", group: "Deployment" },
];

export default function Skills() {
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const els = itemRefs.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pair-active");
          } else {
            entry.target.classList.remove("pair-active");
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    els.forEach((el) => el && io.observe(el));

    return () => io.disconnect();
  }, []);

  const addItemRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (!itemRefs.current.includes(el)) itemRefs.current.push(el);
  };

  return (
    <section id="skills" className="mt-20">
      {/* Header */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Skills</h2>
          <p className="mt-2 text-white/55">
            A snapshot of the tools and domains I work with.
          </p>
        </div>
      </div>

      {/* Premium Panel */}
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        {/* Glow + scanlines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/12 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(180,120,255,0.55)_1px,transparent_1px)] bg-[length:100%_4px]" />
          </div>
        </div>

        <div className="relative z-10">
          {/* ✅ 2-column layout always (like your request) */}
          <div className="grid gap-4 md:grid-cols-2">
            {SKILLS.map((skill, i) => {
              const side = i % 2 === 0 ? "left" : "right";

              return (
                <div
                  key={skill.name}
                  ref={addItemRef}
                  className={`pair-item ${side}`}
                  style={{
                    transitionDelay: `${Math.floor(i / 2) * 70}ms`,
                  }}
                >
                  <SkillCard name={skill.name} group={skill.group} />
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div className="mt-8 flex items-center justify-between text-xs text-white/35">
            <span className="tracking-[0.18em] uppercase">Stack Snapshot</span>
            <span className="hidden md:inline">
              scroll choreography • hover-reactive
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Animation styles */}
      <style jsx>{`
        .pair-item {
          opacity: 0.35;
          filter: blur(12px);
          transform: translateY(10px) scale(0.99);
          transition: opacity 650ms ease, transform 650ms ease,
            filter 800ms ease;
          will-change: transform, opacity, filter;
        }

        /* Left cards start from left */
        .pair-item.left {
          transform: translateX(-90px) translateY(10px) scale(0.99);
        }

        /* Right cards start from right */
        .pair-item.right {
          transform: translateX(90px) translateY(10px) scale(0.99);
        }

        /* When card is active in viewport: meet in place */
        .pair-item.pair-active {
          opacity: 1;
          filter: blur(0px);
          transform: translateX(0px) translateY(0px) scale(1);
        }

        /* Responsive: on very small screens keep it clean (no sideways travel) */
        @media (max-width: 640px) {
          .pair-item.left,
          .pair-item.right {
            transform: translateX(0px) translateY(10px) scale(0.99);
          }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------
   Skill Card (same premium interactive hover)
-------------------------------------------- */
function SkillCard({ name, group }: { name: string; group: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;

    const rotateY = nx * 10;
    const rotateX = -ny * 9;

    el.style.transform = `perspective(850px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transform =
      "perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 transition-all duration-300 hover:border-violet-300/35 hover:bg-black/35 will-change-transform"
      style={
        {
          transform:
            "perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* accent wash */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/18 via-white/5 to-transparent" />
      </div>

      {/* cursor-follow glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            left: "var(--mx)",
            top: "var(--my)",
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, rgba(180,120,255,0.22), rgba(0,0,0,0) 60%)",
          }}
        />
      </div>

      {/* shine line */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10">
        <p className="text-[11px] tracking-[0.24em] text-white/35">
          {group.toUpperCase()}
        </p>

        <p className="mt-2 text-base font-medium text-white/90 transition group-hover:text-white">
          {name}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/90 shadow-[0_0_14px_rgba(180,120,255,0.8)]" />
          <span className="text-[11px] text-white/40 group-hover:text-white/55">
            active
          </span>
        </div>
      </div>

      {/* depth border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 transition group-hover:ring-white/10" />
    </div>
  );
}
