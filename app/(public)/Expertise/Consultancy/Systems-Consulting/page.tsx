"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";


export default function SystemsConsultingPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Expert Systems Consulting for Your Business
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We provide expert systems consulting services to help organizations optimize their IT infrastructure, streamline operations, and enhance overall performance.
        </p>
      </div>

      {/* Consulting Services Overview Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            TRANSFORM YOUR IT INFRASTRUCTURE
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Systems Consulting Services to Optimize Your Business
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our expert consultants offer comprehensive solutions to optimize your systems, improve efficiency, and enhance performance across your business operations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">IT Infrastructure Optimization</h3>
            <p className="mt-4 text-gray-600">
              We assess your current IT infrastructure and implement strategies to optimize performance, reduce costs, and improve scalability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Business Process Automation</h3>
            <p className="mt-4 text-gray-600">
              Streamline your operations with custom automation solutions that improve workflow efficiency and reduce manual intervention.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">System Integration</h3>
            <p className="mt-4 text-gray-600">
              We help integrate various systems and software into a seamless and efficient environment to improve communication and data flow across your business.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Optimize Your Systems?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Our consulting services will help you achieve better operational efficiency and enhanced system performance. Let’s get started today.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Schedule a Consultation
          </button>
          <button
            onClick={() => window.open('https://github.com/your-profile', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Work
          </button>
        </div>
      </div>
        <ContactSection />

    </section>
  );
}
