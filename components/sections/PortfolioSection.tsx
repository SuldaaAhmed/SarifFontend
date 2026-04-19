"use client";

import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Enterprise Dashboard System",
    category: "Web Application",
    image: "/Images/dash.png",
  },
  {
    title: "Business Website",
    category: "Saas Application",
    image: "/Images/landpages.png",
  },
  {
    title: "ASP.NET Core API Architecture",
    category: "Backend Engineering",
    image: "/Images/back.png",
  },
  {
    title: "Next.js Frontend Architecture",
    category: "Frontend Engineering",
    image: "/Images/fronend.png",
  },
  {
    title: "Educational website",
    category: "Web Application",
    image: "/Images/ecourmes.png",
  },
  {
    title: "UI/UX Design For Web App",
    category: "UI/UX Design",
    image: "/Images/portfolio/video.jpg",
  },
];

export default function PortfolioSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-br from-[#00bf63]/5 to-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-block mb-3 rounded-full
            border border-[#00bf63]/30
            px-4 py-1 text-xs font-semibold
            text-[#00bf63] uppercase"
          >
            Portfolio
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044]">
            Some of My Recent Projects
          </h2>

          <p className="mt-4 text-gray-600">
            A selection of recent projects I have built and collaborated on,
            showcasing my expertise in development, design, and digital solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl
              border border-[#00bf63]/20 shadow-md hover:shadow-xl
              transition-all duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div
                className="absolute inset-0 bg-gradient-to-t
                from-[#090044]/80 via-[#090044]/40 to-transparent
                opacity-0 group-hover:opacity-100
                transition duration-300 flex items-end"
              >
                <div className="p-6 text-white">
                  <span className="text-sm text-[#00bf63] font-medium">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center justify-center
            rounded-full bg-[#00bf63] px-8 py-3
            text-white font-semibold
            hover:bg-[#090044] transition-all duration-300"
          >
            {showAll ? "Show Less" : "View All Projects"}
          </button>
        </div>

      </div>
    </section>
  );
}