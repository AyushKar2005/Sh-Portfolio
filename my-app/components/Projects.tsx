// src/components/Projects.tsx
"use client";

export default function Projects() {
  const projects = [
    {
      title: "Resume Analyzer + AI Job Recommendation",
      subtitle: "NLP • Scoring • Recommendations",
      description:
        "Analyzes a resume, highlights weak areas, and gives actionable suggestions to improve job readiness.",
      tags: ["Resume Parsing", "Skill Gaps", "Career Guidance"],
      github: "https://github.com/shruti870/AI_Job_Recommendation",
      live: "",
      status: "ACTIVE",
    },
    {
      title: "AI School Dropout Prediction Website",
      subtitle: "ML • Classification • Web App",
      description:
        "Predicts whether a student is likely to drop out in the future using trained ML models and key indicators.",
      tags: ["Prediction System", "Education", "ML Models"],
      github: "https://github.com/AyushKar2005/Student_Dropout.git",
      live: "",
      status: "DEPLOYED",
    },
  ] as const;

  return (
    <section id="projects" className="mt-20">
      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.3em] text-fuchsia-300/70">
          PROJECTS / SELECTED WORK
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Projects</h2>
        <p className="mt-3 max-w-xl text-white/60">
          A focused set of systems built for real-world ML workflows — simple, practical, and useful.
        </p>
      </div>

      {/* 2 equal cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.title}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            {/* glow + scanlines */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-violet-500/10" />
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(236,72,153,0.55)_1px,transparent_1px)] bg-[length:100%_4px]" />
              </div>
            </div>

            <div className="relative z-10">
              {/* subtitle + status */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                  {p.subtitle}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    p.status === "DEPLOYED"
                      ? "border border-violet-400/25 bg-violet-400/15 text-violet-200"
                      : "border border-fuchsia-400/25 bg-fuchsia-400/15 text-fuchsia-200"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* title */}
              <h3 className="mt-4 text-xl font-semibold text-white">{p.title}</h3>

              {/* description */}
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {p.description}
              </p>

              {/* tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  GitHub
                </a>

                {p.live ? (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    Live Demo
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/40"
                  >
                    Live Demo (soon)
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
