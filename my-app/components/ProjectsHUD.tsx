"use client";

import { useMemo, useState } from "react";

type Project = {
  title: string;
  subtitle: string;
  tag: string;
  bullets: string[];
};

export default function ProjectsHUD() {
  const projects: Project[] = useMemo(
    () => [
      {
        title: "Text to Insights Agent",
        subtitle: "NLP, GenAI",
        tag: "Featured",
        bullets: [
          "Document summarization + Q/A",
          "RAG pipeline with embeddings",
          "Fast inference + caching",
        ],
      },
      {
        title: "Hand Sign Recognition",
        subtitle: "Computer Vision",
        tag: "Vision",
        bullets: ["Realtime detection", "Custom dataset", "Robust preprocessing"],
      },
      {
        title: "Medical Chatbot",
        subtitle: "Python, Regex",
        tag: "Chat",
        bullets: ["Intent matching", "Symptom flows", "Fast responses"],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const prev = (active - 1 + projects.length) % projects.length;
  const next = (active + 1) % projects.length;

  return (
    <section id="projects" className="mt-20">
      {/* header */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.3em] text-fuchsia-300/70">
            SYSTEM / MODULES
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Projects</h2>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_14px_rgba(236,72,153,0.75)]" />
          LIVE • PORTFOLIO STACK
        </div>
      </div>

      {/* 3D HUD stage */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.14),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.12),transparent_55%)]" />

        {/* scanlines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(236,72,153,0.55)_1px,transparent_1px)] bg-[length:100%_4px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* stage controls */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-white/55">
              Select a module to inspect details.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActive(prev)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10"
              >
                Prev
              </button>
              <button
                onClick={() => setActive(next)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10"
              >
                Next
              </button>
            </div>
          </div>

          {/* 3 cards */}
          <div className="hud-stage">
            {/* left */}
            <HUDPanel
              project={projects[prev]}
              variant="left"
              onClick={() => setActive(prev)}
            />

            {/* center */}
            <HUDPanel
              project={projects[active]}
              variant="center"
              onClick={() => {}}
              active
            />

            {/* right */}
            <HUDPanel
              project={projects[next]}
              variant="right"
              onClick={() => setActive(next)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HUDPanel({
  project,
  variant,
  onClick,
  active = false,
}: {
  project: Project;
  variant: "left" | "center" | "right";
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "hud-panel",
        `hud-${variant}`,
        active ? "hud-active" : "",
      ].join(" ")}
    >
      {/* top micro numbers */}
      <div className="hud-topline">
        <span className="hud-digits">000.100</span>
        <span className="hud-tag">{project.tag}</span>
      </div>

      {/* orb placeholder */}
      <div className="hud-orb" />

      <div className="hud-title">{project.title}</div>
      <div className="hud-subtitle">{project.subtitle}</div>

      <div className="hud-list">
        {project.bullets.map((b) => (
          <div key={b} className="hud-li">
            → {b}
          </div>
        ))}
      </div>

      {/* corner accents */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
    </button>
  );
}
