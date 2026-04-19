import { Search, DraftingCompass, Code, TrendingUp } from "lucide-react";

const process = [
  {
    title: "Understand the Problem",
    description:
      "I start by deeply understanding the business challenge, identifying pain points, and defining clear goals.",
    icon: Search,
  },
  {
    title: "Design the System",
    description:
      "I design scalable and efficient system architecture tailored to the specific needs of the business.",
    icon: DraftingCompass,
  },
  {
    title: "Build the Solution",
    description:
      "I develop reliable and secure systems using modern technologies with performance and scalability in mind.",
    icon: Code,
  },
  {
    title: "Deliver & Optimize",
    description:
      "I ensure the solution delivers real results and continuously improve it based on feedback and data.",
    icon: TrendingUp,
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-gray-50 py-16">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <span className="text-[#00bf63] font-semibold uppercase text-sm">
          How I Work
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044] mt-3">
          How I Solve Real Business Problems
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          My approach is focused on understanding challenges, designing the right systems,
          and delivering solutions that create measurable impact.
        </p>

        {/* STEPS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#00bf63]/10 text-[#00bf63] mb-4">
                  <Icon size={20} />
                </div>

                <h3 className="font-bold text-[#090044] mb-2">
                  {index + 1}. {item.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}