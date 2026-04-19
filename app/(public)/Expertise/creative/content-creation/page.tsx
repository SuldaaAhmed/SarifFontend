"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";

export default function ContentCreationPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Professional Content Creation Services
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          High-quality content designed to engage, inform, and convert across websites, blogs, social media, and marketing campaigns.
        </p>
      </div>

      {/* Content Creation Services Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            ELEVATE YOUR BRAND
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Tailored Content That Engages & Converts
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We create content that resonates with your audience, boosts engagement, and drives conversions across all platforms.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Website Content</h3>
            <p className="mt-4 text-gray-600">
              We create engaging and SEO-optimized content for your website that attracts traffic and keeps visitors coming back.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Blog Content</h3>
            <p className="mt-4 text-gray-600">
              Our expert writers craft informative, engaging, and shareable blog posts that drive traffic and build authority in your industry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Social Media Content</h3>
            <p className="mt-4 text-gray-600">
              We develop compelling social media posts that foster engagement and grow your following on platforms like Facebook, Instagram, and Twitter.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Transform Your Content Strategy?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let’s create content that connects with your audience and helps you achieve your business goals.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Start Your Content Journey
          </button>
          <button
            onClick={() => window.open('https://github.com/your-profile', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Portfolio
          </button>
        </div>
      </div>
            <ContactSection />

    </section>
  );
}
