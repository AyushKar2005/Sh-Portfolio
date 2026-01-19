// src/components/Contact.tsx
"use client";

import { Mail, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xvzzrybl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <section id="contact" className="mt-20 pb-14">
      <p className="text-xs tracking-[0.3em] text-fuchsia-300/70">
        CONTACT / CONNECT
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-white">Contact</h2>
      <p className="mt-3 max-w-xl text-white/60">
        Want to collaborate, hire, or discuss ML ideas? Let’s talk.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Left Info Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-transparent to-violet-500/10" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <Mail className="h-5 w-5 text-fuchsia-300" />
              </div>
              <div>
                <p className="text-sm text-white/50">Email</p>
                <a
                  href="mailto:jhashrutikumari@gmail.com"
                  className="mt-1 block font-medium text-white/85 hover:text-white"
                >
                  shrutijhadev@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <Linkedin className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <p className="text-sm text-white/50">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/shruti-kumari-915589331/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-medium text-white/85 hover:text-white"
                >
                  linkedin.com/in/shruti-kumari-915589331
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/60">
              <p className="font-medium text-white/80">Quick Note</p>
              <p className="mt-2">
                I usually reply within{" "}
                <span className="text-white/80">24 hours</span>.
              </p>
            </div>
          </div>
        </div>

        {/* AJAX Form */}
        <form
          onSubmit={submit}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/12 via-transparent to-fuchsia-500/10" />

          <div className="relative z-10">
            <p className="text-sm text-white/60">Send a message</p>

            <label className="mt-5 block text-sm text-white/60">Your Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-fuchsia-400/35"
              placeholder="Enter your name"
            />

            <label className="mt-5 block text-sm text-white/60">
              Your Email
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-violet-400/35"
              placeholder="Enter your email"
            />

            <label className="mt-5 block text-sm text-white/60">Message</label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              required
              className="mt-2 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-fuchsia-400/35"
              placeholder="Write something..."
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-60"
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}

              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Sent!"
                : "Send Message"}
            </button>

            {/* Success / Error animation */}
            <div className="mt-3 min-h-[18px] text-center text-xs">
              {status === "success" && (
                <p className="animate-[pop_0.35s_ease-out] text-emerald-300/90">
                  ✅ Message delivered successfully!
                </p>
              )}
              {status === "error" && (
                <p className="animate-[pop_0.35s_ease-out] text-red-300/90">
                  ❌ Failed. Please try again.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* tiny animation keyframes */}
      <style jsx>{`
        @keyframes pop {
          0% {
            transform: translateY(6px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
