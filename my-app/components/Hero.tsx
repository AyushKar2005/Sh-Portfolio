import PixelPortraitBG from "./PixelPotraitBG";
import HeroMarquee from "./HeroMarquee";

export default function Hero() {
  return (
    <section className="relative mt-14 min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-black px-6 py-16 md:px-12 md:py-20">
      {/* ✅ Pixel Portrait Background */}
      <div className="absolute inset-0 z-0 opacity-75">
        <PixelPortraitBG imageSrc="/shruti.png" pixelGap={4}  />
      </div>

      {/* ✅ Softer overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#2a0c45]/40 via-black/20 to-black/20" />

      {/* ✅ Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.08]">
        <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(180,120,255,0.6)_1px,transparent_1px)] bg-[length:100%_4px]" />
      </div>

      {/* Content */}
      <div className="relative z-[3]">
        <p className="text-sm text-white/60">Machine Learning Engineer</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-6">
          <HeroMarquee />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white hover:bg-white/10"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}