"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";


export default function BusinessApplicationPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Business Applications That Drive Growth
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          Custom ERP, CRM, dashboards, and internal systems designed to automate your processes, increase efficiency, and scale your operations.
        </p>
      </div>

      {/* Solutions Overview */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            SOLUTIONS THAT TRANSFORM
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Streamline Your Operations with Our Business Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a range of customizable solutions to optimize every aspect of your business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Custom ERP Solutions</h3>
            <p className="mt-4 text-gray-600">
              Streamline your business processes with a tailored ERP system that integrates finance, inventory, orders, and production in one platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">CRM Systems</h3>
            <p className="mt-4 text-gray-600">
              Manage customer relationships efficiently with a CRM that tracks interactions, automates workflows, and helps you increase sales and customer loyalty.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Real-time Dashboards</h3>
            <p className="mt-4 text-gray-600">
              Gain insights at a glance with custom dashboards that display key metrics and performance indicators to drive decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Scale Your Business with Our Applications?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let's discuss how we can help you optimize and automate your business operations. Contact us today to get started.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Get a Free Consultation
          </button>
          <button
            onClick={() => window.open('#', '_blank')}
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
