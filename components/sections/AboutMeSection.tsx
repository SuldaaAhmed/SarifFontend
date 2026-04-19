"use client";

export default function AboutMeSection() {
  return (
    <section className="py-8 bg-white lg:bg-[#00bf63]/5">
      <div className="mx-auto max-w-6xl px-6">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#090044]">
            <span className="relative inline-block">
              About
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-[#00bf63] rounded-full"></span>
            </span>{" "}
            <span className="text-[#00bf63]">Me</span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Who is Adnan */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[#00bf63]/20 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#00bf63] mb-4">
              Who is <span className="text-[#090044]">Adnan Kahiye?</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A systems-focused engineer who helps businesses design secure,
              scalable, production-ready platforms. I specialize in building
              architectures that support growth, reduce risk, and ensure
              long-term operational stability.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[#00bf63]/20 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#00bf63] mb-4">
              Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To design production-grade digital systems that help companies
              grow confidently without compromising performance, security,
              or reliability.
            </p>
          </div>

          {/* How I Work */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[#00bf63]/20 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#00bf63] mb-4">
              How I Work
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I approach every project with architecture-first thinking,
              balancing scalability, security, performance, and cost.
              Clear communication and structured execution guide my process.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[#00bf63]/20 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#00bf63] mb-4">
              Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To contribute to a future where businesses operate on resilient,
              well-architected systems that enable innovation, stability,
              and sustainable growth.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}