// src/components/Loader.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/context/AudioProvider";

type LoaderProps = {
  onComplete: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const { start } = useAudio();

  const script = useMemo(
    () => [
      { prefix: ">", text: "run shruti.ai" },
      { prefix: ">", text: "load shruti.core... 100%" },
    ],
    []
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>(["", ""]);
  const [done, setDone] = useState(false);

  // ✅ Typewriter effect
  useEffect(() => {
    if (done) return;

    const current = script[lineIndex];
    const full = `${current.prefix} ${current.text}`;

    const speed = 28;

    const t = setTimeout(() => {
      setTypedLines((prev) => {
        const next = [...prev];
        next[lineIndex] = full.slice(0, charIndex + 1);
        return next;
      });

      if (charIndex + 1 >= full.length) {
        // finished a line
        if (lineIndex + 1 < script.length) {
          setLineIndex((v) => v + 1);
          setCharIndex(0);
        } else {
          // finished all lines
          setDone(true);
        }
      } else {
        setCharIndex((v) => v + 1);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [charIndex, done, lineIndex, script]);

  // ✅ Launch = start music + exit loader
  const launch = async () => {
    await start();
    onComplete();
  };

  return (
    <div className="loaderViolet fixed inset-0 z-[99999] overflow-hidden bg-black">
      <div className="loaderViolet__vignette" />
      <div className="loaderViolet__scanlines" />
      <div className="loaderViolet__glow" />

      {/* ✅ CENTERED TERMINAL */}
      <div className="loaderViolet__center">
        <div className="loaderViolet__terminal">
          <div className="loaderViolet__line">{typedLines[0]}</div>

          <div className="loaderViolet__line">
            {typedLines[1]}
            {!done && <span className="loaderViolet__cursor" />}
          </div>

          {/* ✅ Launch button */}
          {done && (
            <button onClick={launch} className="loaderViolet__launch">
              launch interface
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
