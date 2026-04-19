"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";

export default function DigitalMarketingPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Digital Marketing Solutions That Drive Results
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          Data-driven marketing strategies that help increase visibility, engagement, and conversions for your business.
        </p>
      </div>

      {/* Digital Marketing Solutions Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            TRANSFORM YOUR BUSINESS
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Digital Marketing Strategies That Work
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer custom digital marketing services to elevate your online presence, drive traffic, and convert leads into loyal customers.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">SEO Optimization</h3>
            <p className="mt-4 text-gray-600">
              Improve your website’s ranking on search engines with targeted SEO strategies, driving more organic traffic to your site.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Social Media Marketing</h3>
            <p className="mt-4 text-gray-600">
              Build a strong presence on social platforms with customized social media campaigns that engage your audience and boost brand awareness.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Paid Advertising (PPC)</h3>
            <p className="mt-4 text-gray-600">
              Drive immediate results with paid advertising campaigns on Google Ads, Facebook, and other platforms, targeting the right audience.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Grow Your Online Presence?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let’s work together to create a digital marketing strategy that drives growth and delivers measurable results.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Get a Free Consultation
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
