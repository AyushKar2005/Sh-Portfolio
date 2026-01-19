// src/app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ThemeCursor from "@/components/ThemeCursor";

import { Instagram, Linkedin, Github, Mail } from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <ThemeCursor />

      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="mt-20 border-t border-white/10 bg-black/40 py-10 text-center text-sm text-white/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6">
          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/shrutijj__?igsh=ajNqMGdlN2E3cmk="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition hover:border-fuchsia-400/30 hover:bg-white/10 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/in/shruti-kumari-915589331/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href="https://github.com/shruti870"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="mailto:shrutijhadev@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition hover:border-fuchsia-400/30 hover:bg-white/10 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Gmail
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/40">
            © {new Date().getFullYear()} • All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
