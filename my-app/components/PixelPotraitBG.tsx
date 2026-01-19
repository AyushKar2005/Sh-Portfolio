"use client";

import { useEffect, useRef } from "react";

type Props = {
  imageSrc?: string;
  pixelGap?: number; // 3-7
};

export default function PixelPortraitBG({
  imageSrc = "/shruti.png",
  pixelGap = 4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;

    // ✅ Performance scaling
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 130,
      strength: 18, // ✅ make interaction stronger and snappier
    };

    type Dot = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      a: number;
      s: number; // size
    };

    let dots: Dot[] = [];
    let ready = false;

    const img = new Image();
    img.src = imageSrc;

    const resize = () => {
      const parent = canvas.parentElement!;
      W = parent.clientWidth;
      H = parent.clientHeight;

      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      if (ready) buildDots();
    };

    const buildDots = () => {
      dots = [];

      // Offscreen canvas for sampling pixels
      const buffer = document.createElement("canvas");
      const bctx = buffer.getContext("2d")!;

      // ✅ Make portrait BIGGER
      // Old: * 0.95
      const scale = Math.min(W / img.width, H / img.height) * 1.25; // ✅ bigger portrait
      const iw = Math.floor(img.width * scale);
      const ih = Math.floor(img.height * scale);

      buffer.width = iw;
      buffer.height = ih;

      bctx.clearRect(0, 0, iw, ih);
      bctx.drawImage(img, 0, 0, iw, ih);

      const imgData = bctx.getImageData(0, 0, iw, ih);
      const data = imgData.data;

      // center it
      const offsetX = (W - iw) / 2;
      const offsetY = (H - ih) / 2;

      // ✅ Thresholding values (important to form face properly)
      const alphaCut = 20; // ignore transparent
      const brightnessMin = 0.20; // ignore too dark pixels (background)
      const brightnessMax = 0.98;

      for (let y = 0; y < ih; y += pixelGap) {
        for (let x = 0; x < iw; x += pixelGap) {
          const idx = (y * iw + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a < alphaCut) continue;

          // brightness 0..1
          const brightness =
            (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

          // ✅ Remove low brightness noise (helps portrait pop)
          if (brightness < brightnessMin || brightness > brightnessMax) continue;

          // ✅ Make brighter areas more visible
          const alpha = Math.min(1, 0.15 + brightness * 0.95);

          dots.push({
            x: x + offsetX,
            y: y + offsetY,
            ox: x + offsetX,
            oy: y + offsetY,
            vx: 0,
            vy: 0,
            a: alpha,
            s: brightness > 0.55 ? 2.25 : 1.65, // ✅ slightly larger dots
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // ✅ Pinkish violet palette
      const DOT_COLOR = "#d06bff"; // ✅ pink-violet
      const SCANLINE_COLOR = "rgba(208,107,255,0.75)";
      const GLOW_COLOR = "rgba(208,107,255,0.14)";

      // ✅ background vignette (pink-violet)
      const bg = ctx.createRadialGradient(
        W * 0.52,
        H * 0.45,
        10,
        W * 0.5,
        H * 0.5,
        Math.max(W, H)
      );
      bg.addColorStop(0, GLOW_COLOR);
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ✅ scanlines (light pink-violet)
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = SCANLINE_COLOR;
      for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
      ctx.globalAlpha = 1;

      // ✅ faster physics
      const friction = 0.82; // lower = quicker decay
      const returnForce = 0.09; // higher = snaps back quicker

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const push = (1 - dist / mouse.radius) * mouse.strength;
          p.vx += (dx / (dist || 1)) * push;
          p.vy += (dy / (dist || 1)) * push;
        }

        // pull back to origin
        p.vx += (p.ox - p.x) * returnForce;
        p.vy += (p.oy - p.y) * returnForce;

        // friction
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // ✅ draw dot
        ctx.globalAlpha = p.a;
        ctx.fillStyle = DOT_COLOR;

        // circle dot (premium)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    img.onload = () => {
      ready = true;
      resize();
      buildDots();
      draw();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [imageSrc, pixelGap]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
