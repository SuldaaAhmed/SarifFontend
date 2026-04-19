"use client";
import React from 'react';

import ContactSection from "@/components/sections/ContactSection";

export default function ConsultingMediaPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Social Media Consultancy & Management
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We offer consultancy services to help you grow and optimize your social media presence, build engagement, and foster brand loyalty.
        </p>
      </div>

      {/* Consultancy Services Overview Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            BOOST YOUR SOCIAL MEDIA PRESENCE
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Tailored Social Media Strategies for Your Business
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            With our expertise, we help brands build strategic social media plans that increase visibility, foster engagement, and convert followers into loyal customers.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Strategy Development</h3>
            <p className="mt-4 text-gray-600">
              We develop data-driven social media strategies aligned with your business goals to maximize reach and engagement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Social Media Management</h3>
            <p className="mt-4 text-gray-600">
              From posting content to responding to comments, we handle all aspects of your social media presence with a focus on building a strong community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Performance Tracking</h3>
            <p className="mt-4 text-gray-600">
              We monitor and analyze social media metrics to track performance, optimize content, and adjust strategies for continuous growth.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Take Your Social Media to the Next Level?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let’s work together to create a tailored social media strategy that drives growth and fosters brand loyalty.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Schedule a Consultation
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
