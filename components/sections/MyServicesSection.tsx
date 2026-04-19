import {
  Code2,
  Cpu,
  ShieldCheck,
  Globe,
  Rocket,
  ArrowRight,
  GraduationCap,
  Smartphone,
  Megaphone,
} from "lucide-react";

const services = [
  {
    title: "Website & App Development",
    description:
      "We create fast, modern websites and applications that help your business grow and attract more customers.",
    icon: Code2,
  },
  {
    title: "Mobile App Development",
    description:
      "We build user-friendly mobile applications that connect you with your customers anytime, anywhere.",
    icon: Smartphone,
  },
  {
    title: "Smart Business Solutions",
    description:
      "We build systems that automate your work, save time, and improve decision making.",
    icon: Cpu,
  },

  {
    title: "Digital Transformation",
    description:
      "We help you upgrade your business with modern digital tools and systems.",
    icon: Globe,
  },
  {
    title: "Social Media & Content Creation",
    description:
      "We manage your social media, create engaging content, and help your brand reach more people.",
    icon: Megaphone,
  },
  {
    title: "Tech Coaching & Mentorship",
    description:
      "We support intermediate learners to improve skills, build projects, and grow their careers.",
    icon: GraduationCap,
  },
];

export default function MyServicesSection() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#090044]">
            <span className="relative inline-block">
              Our
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-[#00bf63] rounded-full"></span>
            </span>{" "}
            <span className="text-[#00bf63]">Services</span>
          </h2>
        </div>

          <p className="mt-6 text-gray-500 text-lg leading-relaxed">
            We provide simple and powerful solutions to help your business grow,
            save time, and reach more customers.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* ICON */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#00bf63]/10 text-[#00bf63] mb-6">
                  <Icon size={26} />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-bold text-[#00bf63] mb-3">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA SECTION */}
        <div className="mt-24 bg-[#090044] text-white rounded-3xl p-12 text-center relative overflow-hidden">
          
          <div className="relative z-10">
            <Rocket className="mx-auto mb-6 text-[#00bf63]" size={40} />

            <h3 className="text-3xl font-black mb-4">
              Ready to grow your business?
            </h3>

            <p className="text-gray-300 mb-10 max-w-xl mx-auto">
              Let’s work together to build solutions that bring real results and
              help your business succeed.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00bf63] text-[#090044] font-bold rounded-xl hover:bg-white transition">
                Get Started <ArrowRight size={20} />
              </button>

              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white hover:text-[#090044] transition">
                Request Demo
              </button>

            </div>
          </div>

          {/* Glow */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#00bf63]/20 rounded-full blur-3xl" />
        </div>

      </div>
    </section>
  );
}