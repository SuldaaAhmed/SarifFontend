"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const backgrounds = [
  "/Images/one.jpeg",
  "/Images/one copy.jpeg",
];

export default function HeroSection() {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % backgrounds.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextBg = () => {
    setActiveBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBg = () => {
    setActiveBg((prev) =>
      prev === 0 ? backgrounds.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Slider */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            activeBg === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={bg}
            alt="Hero Background"
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090044]/90 via-[#090044]/85 to-[#090044]/95" />

      {/* Arrows */}
      <button
        onClick={prevBg}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2
        z-20 rounded-full bg-[#00bf63] p-3 text-white
        hover:bg-[#00a955] transition shadow-lg"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={nextBg}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2
        z-20 rounded-full bg-[#00bf63] p-3 text-white
        hover:bg-[#00a955] transition shadow-lg"
      >
        <ChevronRight size={26} />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        {/* Badge */}
  <div className="hidden md:inline-flex items-center gap-2 mb-8 px-6 py-2
  rounded-full bg-[#00bf63]/15 border border-[#00bf63]/40">
  <span className="h-2 w-2 rounded-full bg-[#00bf63] animate-pulse" />
  <span className="text-xs font-semibold tracking-wide text-[#00bf63] uppercase">
    System Architect & Software Engineer
  </span>
</div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
          Building Reliable & <br />
          <span className="text-[#00bf63]">
            Scalable Digital Systems
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          I help businesses transform ideas into secure, high-performance systems
          engineered for long-term growth and scalability.
        </p>

        {/* Name */}
        <p className="mt-4 text-sm text-gray-400 tracking-wide">
          Adnan Kahiye
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          <Link
            href="/Expertise"
            className="rounded-full bg-[#00bf63] px-10 py-3
            font-semibold text-white hover:bg-[#00a955]
            transition shadow-lg"
          >
            Explore My Expertise
          </Link>

          <Link
            href="/about-us"
            className="rounded-full border border-white/30
            px-10 py-3 font-semibold text-white
            hover:bg-white/10 transition"
          >
          More About Me
          </Link>
        </div>

      </div>
    </section>
  );
}