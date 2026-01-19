"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type AudioCtxType = {
  isPlaying: boolean;
  toggle: () => void;
  start: () => void;
  stop: () => void;
};

const AudioCtx = createContext<AudioCtxType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/boot.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const start = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      // autoplay blocked unless user interacts
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (!audioRef.current) return;
    if (isPlaying) stop();
    else await start();
  };

  return (
    <AudioCtx.Provider value={{ isPlaying, toggle, start, stop }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
