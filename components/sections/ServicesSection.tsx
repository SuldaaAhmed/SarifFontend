"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = ["EDUCATION", "WORK HISTORY", "TECHNOLOGY I USE"] as const;
type Tab = typeof TABS[number];

const DATA: Record<Tab, { title: string; desc: string; image: string }[]> = {
  EDUCATION: [
    {
      title: "Bachelor of Computer Science",
      desc: "Jamhuriya University of Science & Technology (JUS)",
      image: "/Images/justone.jpeg",
    },
    {
      title: "Microsoft Certified Back-End Developer",
     desc: "ASP.NET Core and scalable backend systems.",
      image: "/Images/microftapi.png",
    },
    {
      title: "Packt Certified Docker & Kubernetes",
      desc: "Certified in Docker containerization and Kubernetes.",
      image: "/Images/docker.png",
    },
    {
      title: "Meta Certified Frontend Developer",
      desc: "Certified in modern frontend development practices.",
      image: "/Images/frontend.png",
    },
  ],

  "WORK HISTORY": [
    {
      title: "Software Developer",
      desc: "Tabaarak ICT Solotions (2025-2026)",
      image: "/Images/tbrk.png",
    },
    {
      title: "Trainer & Mentor",
      desc: "Guiding junior developers(2023-present).",
      image: "/Images/Trainer.jpg",
    },
    {
      title: "System Architect",
      desc: "Designing high-performance infrastructures (2024-present).",
      image: "/Images/system.png",
    },
    {
      title: "Content Creator",
      desc: "Technical blogs & educational content (2022-present).",
      image: "/Images/content.png",
    },
  ],

  "TECHNOLOGY I USE": [
    {
      title: "Next.js",
      desc: "Modern frontend development",
      image: "/Images/next.png",
    },
    {
      title: "ASP.NET Core",
      desc: "Enterprise backend systems",
      image: "/Images/net.png",
    },
    {
      title: "Docker & PostgreSQL",
      desc: "Docker,PostgreSQL & Kubernetes.",
      image: "/Images/dockepostress.png",
    },
    {
      title: "Azure",
      desc: "Cloud infrastructure & DevOps",
      image: "/Images/Azure.png",
    },
  ],
};

export default function AchievementsSection() {
  const [tab, setTab] = useState<Tab>("EDUCATION");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-[#090044]">
            My <span className="text-[#00bf63]">ACHIEVEMENTS</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Education, experience, and technologies shaping my professional journey.
          </p>
        </div>

        {/* TABS */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300
              ${
                tab === t
                  ? "bg-[#00bf63] text-white shadow-md"
                  : "border border-[#00bf63] text-[#090044] hover:bg-[#00bf63]/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DATA[tab].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100
              shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="font-bold text-[#090044] text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 h-1 w-12 bg-[#00bf63] mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}