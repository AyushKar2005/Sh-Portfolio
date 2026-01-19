"use client";

export default function HeroMarquee() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Marquee Track */}
      <div className="marquee-track flex w-max items-center">
        <h1 className="marquee-text">
          SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;
          SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;
        </h1>

        {/* Duplicate for seamless loop */}
        <h1 className="marquee-text ml-16">
          SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;
          SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;SHRUTI&nbsp;KUMARI&nbsp;•&nbsp;
        </h1>
      </div>
    </div>
  );
}
