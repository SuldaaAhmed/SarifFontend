"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";


export default function StartupBusinessPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Strategic Consulting for Startup Businesses
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We provide tailored consulting services to help startups build, grow, and scale their businesses effectively and sustainably.
        </p>
      </div>

      {/* Startup Business Consulting Services Overview */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            POWER YOUR STARTUP'S GROWTH
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Expert Consulting Services for Startups
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We work closely with startups to refine business strategies, optimize operations, and maximize growth potential from day one.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Business Strategy</h3>
            <p className="mt-4 text-gray-600">
              We help startups develop strong, actionable business strategies that align with their vision, goals, and market dynamics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Funding & Investment</h3>
            <p className="mt-4 text-gray-600">
              Our experts guide startups in securing funding, creating pitch decks, and connecting with investors for long-term success.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Growth & Scaling</h3>
            <p className="mt-4 text-gray-600">
              We provide actionable insights and strategies to help startups scale their operations, expand customer reach, and drive profitability.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Scale Your Startup with Expert Consulting?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let’s work together to create a clear, sustainable path for your startup’s success. Get in touch to discuss your growth strategy.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Book a Free Consultation
          </button>
          <button
            onClick={() => window.open('https://github.com/your-profile', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Startup Success Stories
          </button>
        </div>
      </div>
                        <ContactSection />

    </section>
  );
}
