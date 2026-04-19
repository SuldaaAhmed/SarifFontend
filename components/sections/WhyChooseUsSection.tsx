import {
  Code,
  Briefcase,
  Users,
  Share2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "System Builder",
    description:
      "I design and build scalable business systems such as HRM, ERP, and enterprise platforms that solve real operational problems and improve efficiency.",
    icon: Code,
  },
  {
    title: "Business IT Consultant",
    description:
      "I help businesses analyze, design, and implement the right technical solutions to streamline workflows, reduce costs, and scale effectively.",
    icon: Briefcase,
  },
  {
    title: "Community Systems & Platforms",
    description:
      "I build digital platforms that support communities, enable collaboration, and create systems for knowledge sharing and growth.",
    icon: Users,
  },
  {
    title: "Knowledge Sharing & Impact",
    description:
      "I contribute by sharing knowledge, building open solutions, and supporting developers and organizations through technology.",
    icon: Share2,
  },
];

const stats = [
  { label: "Systems Built", value: "30+" },
  { label: "Business Solutions", value: "10+" },
  { label: "Years Experience", value: "5+" },
  { label: "Problem Solving", value: "95%" },
];

export default function MyServicesSection() {
  return (
    <section className="bg-white">

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">

            <span className="inline-block mb-3 rounded-full bg-white px-4 py-1 text-xs font-semibold text-[#00bf63] uppercase shadow">
              My Expertise
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044] leading-tight">
              Engineering Solutions <br className="hidden sm:block" />
            </h2>

            <p className="mt-4 max-w-xl text-gray-700 mx-auto lg:mx-0">
              I am an engineer focused on building systems and solving real business challenges 
              through technology. My work is centered on delivering practical, scalable, and efficient solutions.
            </p>

            {/* SERVICES */}
            <div className="mt-8 space-y-6 text-left">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#00bf63] shadow">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#090044]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center h-[360px] w-full rounded-2xl bg-gradient-to-br from-[#00bf63]/20 to-white shadow-lg p-10">

            <div className="text-center max-w-sm">
              <h3 className="text-xl font-bold text-[#090044] mb-3">
                Engineer Who Solves Problems
              </h3>

              <p className="text-sm text-gray-700">
                My approach is simple. Identify the problem, design the right system, 
                and build a solution that delivers real results for businesses.
              </p>
            </div>

            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full border border-dashed border-[#090044]/30 opacity-40" />
            <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-[#00bf63]/20 blur-xl" />
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="bg-[#090044]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-[#00bf63]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}