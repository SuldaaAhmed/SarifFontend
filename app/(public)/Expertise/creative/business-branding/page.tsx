"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";

export default function BusinessBrandingPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Professional Business Branding
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          Build a memorable and strong brand identity with professional logo design, cohesive visual systems, and comprehensive brand guidelines.
        </p>
      </div>

      {/* Branding Solutions Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            BRANDING THAT WORKS
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Crafting Distinctive Brands for Your Business
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We design brands that stand out and resonate with your audience. Whether it's your first logo or a full rebrand, we create consistent, impactful branding.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Logo Design</h3>
            <p className="mt-4 text-gray-600">
              A unique and professional logo that captures the essence of your brand, ensuring a lasting impression on your audience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Brand Guidelines</h3>
            <p className="mt-4 text-gray-600">
              We create comprehensive brand guidelines to ensure consistency across all your marketing channels, making your brand recognizable everywhere.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Visual Identity Systems</h3>
            <p className="mt-4 text-gray-600">
              Develop a cohesive visual language for your brand with custom color palettes, typography, and design elements.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Create a Strong Brand Identity?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let us help you build a brand that makes an impact and connects with your audience. Book a consultation and start your branding journey today!
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => window.open('https://github.com/your-profile', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Branding Portfolio
          </button>
        </div>
      </div>
            <ContactSection />

    </section>
  );
}
