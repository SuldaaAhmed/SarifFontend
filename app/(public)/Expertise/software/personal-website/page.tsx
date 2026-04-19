"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";


export default function BusinessWebsitePage() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Personal Website Design Services
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We create clean, professional, and fully customized personal websites for portfolios, CVs, freelancers, and public profiles.
        </p>
      </div>

      <div className="mt-16 text-center">
        <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
          ABOUT THE SERVICE
        </span>
        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Get a Personal Website That Reflects Your Professionalism
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you're a freelancer, a job seeker, or a content creator, we’ll help you build a stunning personal website to showcase your skills and expertise.
        </p>
      </div>

      <div className="mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Custom Portfolio Design</h3>
            <p className="mt-4 text-gray-600">
              Showcase your work in a visually appealing portfolio that speaks volumes about your skills and experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Personal Branding</h3>
            <p className="mt-4 text-gray-600">
              Create a personal brand with a unique, professional design that stands out to potential clients and employers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Responsive Design</h3>
            <p className="mt-4 text-gray-600">
              We ensure your personal website looks great and functions smoothly on all devices — desktop, tablet, and mobile.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Build Your Personal Website?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let's work together to create a website that represents your personal brand and professionalism.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => window.open('#', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Portfolio Samples
          </button>
        </div>
      </div>
            <ContactSection />
      
    </section>
  );
}
