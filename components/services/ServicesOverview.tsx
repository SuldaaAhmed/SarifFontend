import { servicesData } from "@/lib/services";
import ServicesSection from "./ServicesSection";

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FFECCD] to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block mb-4 rounded-full bg-[#FFF0F0] px-6 py-2 text-sm font-semibold text-[#D51116] uppercase">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Scalable Services to Power Your Business Growth
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            From cutting-edge software solutions to innovative creative services and professional training, we empower businesses to thrive in a digital-first world.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="space-y-20">
          {servicesData.map((section) => (
            <ServicesSection key={section.category} {...section} />
          ))}
        </div>
      </div>
    </section>
  );
}
