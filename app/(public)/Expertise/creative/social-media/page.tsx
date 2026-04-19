"use client";
import React from 'react';
import ContactSection from "@/components/sections/ContactSection";
export default function SocialMediaManagementPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D51116] leading-tight tracking-tight">
          Social Media Management That Builds Your Brand
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
          We manage, grow, and optimize your social media presence to boost engagement, increase brand awareness, and foster brand loyalty.
        </p>
      </div>

      {/* Services Overview Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            DRIVE ENGAGEMENT
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Social Media Strategies to Engage Your Audience
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From content creation to audience engagement, we create strategies that grow your followers and strengthen your online presence.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Content Creation</h3>
            <p className="mt-4 text-gray-600">
              We craft high-quality, engaging content tailored to your brand's voice and audience, ensuring your message resonates and stands out.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Audience Engagement</h3>
            <p className="mt-4 text-gray-600">
              We actively engage with your followers, respond to comments, and foster conversations that build a loyal community around your brand.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <h3 className="text-xl font-semibold text-gray-900">Performance Tracking</h3>
            <p className="mt-4 text-gray-600">
              We analyze metrics and adjust strategies to ensure continuous growth and performance improvement across all social platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold text-[#D51116]">
          Ready to Boost Your Social Media Presence?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Let’s work together to create a dynamic social media strategy that grows your audience and strengthens your brand.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg hover:bg-[#b50e12] transition-all duration-300"
          >
            Get Started Today
          </button>
          <button
            onClick={() => window.open('#', '_blank')}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            View Our Social Media Work
          </button>
        </div>
      </div>
            <ContactSection />

    </section>
  );
}
