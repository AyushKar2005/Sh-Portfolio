"use client";

import { useEffect, useRef } from "react";

export default function ThemeCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    let rx = x;
    let ry = y;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const loop = () => {
      // smooth ring follow
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;

      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }

      requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    requestAnimationFrame(loop);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="themeCursorRing" />
      <div ref={dot} className="themeCursor" />
    </>
  );
}
