"use client";

import { useEffect, useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioProvider";

type SectionId = "about" | "skills" | "projects" | "contact";

export default function Navbar() {
  const links = useMemo(
    () => [
      { id: "about" as SectionId, label: "About", href: "#about" },
      { id: "skills" as SectionId, label: "Skills", href: "#skills" },
      { id: "projects" as SectionId, label: "Projects", href: "#projects" },
      { id: "contact" as SectionId, label: "Contact", href: "#contact" },
    ],
    []
  );

  const { isPlaying, toggle } = useAudio();

  const [active, setActive] = useState<SectionId>("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Glow/shadow only when scrolling
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY > 10) setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Lock body scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ✅ Active section highlight while scrolling
  useEffect(() => {
    const ids = links.map((l) => l.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting && ids.includes(id)) {
            setActive(id);
          }
        });
      },
      {
        root: null,
        threshold: 0.25,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[9999] border-b backdrop-blur",
        "border-white/10 bg-black/60",
        scrolled
          ? "shadow-[0_12px_60px_rgba(168,85,247,0.16)]"
          : "shadow-none",
      ].join(" ")}
    >
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Left Logo */}
        <a
          href="#"
          className="text-sm font-semibold tracking-wide transition hover:opacity-95"
        >
          <span className="text-white">Shruti</span>
          <span className="text-fuchsia-300">.</span>
          <span className="text-white/50">AI</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <NavLink
              key={l.id}
              href={l.href}
              label={l.label}
              isActive={active === l.id}
            />
          ))}
        </div>

        {/* Desktop Resume + Music */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggle}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-fuchsia-400/30 hover:bg-white/10 hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              {isPlaying ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {isPlaying ? "Music On" : "Music Off"}
            </span>
          </button>

          <a
            href="https://drive.google.com/file/d/15DEGUJ0ZcJllhj8VUww6j4RWW6HxWU0-/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-fuchsia-400/30 hover:bg-white/10 hover:text-white"
          >
            Resume
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 md:hidden"
          aria-label="Open menu"
        >
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-white/80 transition-all duration-300 ${
                open ? "top-[7px] rotate-45 bg-fuchsia-300" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-white/60 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-white/80 transition-all duration-300 ${
                open ? "top-[7px] -rotate-45 bg-violet-300" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute left-0 top-full w-full md:hidden">
            <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/85 p-4 shadow-[0_0_70px_rgba(236,72,153,0.10)] backdrop-blur">
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-violet-500/15" />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.id}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl border px-4 py-3 text-sm transition ${
                      active === l.id
                        ? "border-fuchsia-400/30 bg-fuchsia-400/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{l.label}</span>
                      <span className="text-xs text-white/40">↗</span>
                    </div>
                  </a>
                ))}

                {/* ✅ Music toggle in mobile menu */}
                <button
                  onClick={toggle}
                  className="mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex items-center justify-between w-full">
                    <span className="inline-flex items-center gap-2">
                      {isPlaying ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                      {isPlaying ? "Music On" : "Music Off"}
                    </span>
                    <span className="text-xs text-white/40">↻</span>
                  </span>
                </button>

                <a
                  href="https://drive.google.com/file/d/15DEGUJ0ZcJllhj8VUww6j4RWW6HxWU0-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-black hover:bg-white/90"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* tiny gradient line on scroll */}
      <div
        className={[
          "pointer-events-none h-[1px] w-full transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
          "bg-gradient-to-r from-fuchsia-500/60 via-violet-500/50 to-transparent",
        ].join(" ")}
      />
    </header>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      className={`group relative transition ${
        isActive ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {label}

      {/* underline */}
      <span
        className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />

      {/* glow dot */}
      <span
        className={`absolute -bottom-[5px] left-0 h-1 w-1 rounded-full bg-fuchsia-400 blur-[2px] transition ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </a>
  );
}
