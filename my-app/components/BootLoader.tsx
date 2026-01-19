"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BootLoaderProps = {
  onComplete: () => void;
};

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const lines = useMemo(
    () => [
      "> run Shruti.k",
      "Initializing environment...",
      "Loading modules: numpy, pandas, torch, transformers",
      "[OK] CUDA device found",
      "[OK] Model weights loaded",
      "Starting portfolio server...",
      "Launching UI...",
    ],
    []
  );

  const [bootStarted, setBootStarted] = useState(false);

  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  const TYPE_SPEED = 40;
  const LINE_DELAY = 400;

  // ✅ typing sound refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSoundTimeRef = useRef(0);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/type.mp3");
    audioRef.current.volume = 0.25;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playTypeSound = () => {
    if (!audioRef.current) return;

    const now = performance.now();

    // throttle sound a bit
    if (now - lastSoundTimeRef.current < 28) return;
    lastSoundTimeRef.current = now;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  // ✅ typing logic only AFTER boot started
  useEffect(() => {
    if (!bootStarted) return;
    if (done) return;

    if (lineIndex >= lines.length) {
      setDone(true);
      setTimeout(() => onComplete(), 800);
      return;
    }

    const current = lines[lineIndex];

    if (charIndex >= current.length) {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => [...prev, current]);
        setCurrentLine("");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, LINE_DELAY);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const nextText = current.slice(0, charIndex + 1);
      setCurrentLine(nextText);
      setCharIndex((prev) => prev + 1);

      const latestChar = nextText[nextText.length - 1];
      if (latestChar && latestChar !== " ") playTypeSound();
    }, TYPE_SPEED);

    return () => clearTimeout(timeout);
  }, [bootStarted, charIndex, lineIndex, lines, done, onComplete]);

  const handleBoot = () => {
    if (bootStarted) return;

    // ✅ unlock audio with a real user gesture (click)
    audioRef.current?.play().then(() => {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    });

    setBootStarted(true);
  };

  return (
    <div
      onClick={handleBoot}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-green-400 select-none"
    >
      <div className="w-full max-w-3xl px-6 py-10 font-mono text-sm md:text-base">
        <p className="mb-4 text-green-300/80">ShrutiOS Terminal v1.0</p>

        {/* ✅ CLICK TO BOOT SCREEN */}
        {!bootStarted ? (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap">{"> click to boot"}</div>

            <div className="text-green-300/60 text-xs md:text-sm">
              (Sound enabled after click)
            </div>

            <div className="flex items-center gap-2 text-green-300/70">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs md:text-sm">
                Ready to launch Shruti.k
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* ✅ NORMAL TYPING SCREEN */}
            <div className="space-y-2">
              {typedLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}

              {!done && (
                <div className="whitespace-pre-wrap">
                  {currentLine}
                  <span className="ml-1 animate-pulse">▮</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
