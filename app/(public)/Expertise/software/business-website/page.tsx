"use client";
import React, { useState } from 'react';
import { FaCogs, FaUsers, FaChartBar, FaTasks } from 'react-icons/fa'; // Add your icons here
import { IoIosPeople } from 'react-icons/io'; // Example of other icons
import ContactSection from "@/components/sections/ContactSection";


type SolutionType = {
  id: number;
  title: string;
  description: string;
  features: string[];
  category: string;
};

type PrincipleType = {
  id: number;
  title: string;
  description: string;
};

export default function BusinessWebsitePage() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);

  const handleContactClick = (): void => {
    setIsContactOpen(true);
    console.log('Contact form requested');
  };

  const handleSolutionClick = (solution: string): void => {
    setSelectedSolution(solution);
    console.log(`Viewing details for: ${solution}`);
  };

  const handleLearnMoreClick = (): void => {
    const solutionsSection = document.getElementById('solutions-section');
    solutionsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleDemo = (): void => {
    window.open('https://calendly.com/your-business/demo', '_blank');
  };

  const handleDownloadBrochure = (): void => {
    const link = document.createElement('a');
    link.href = '/brochures/business-solutions.pdf';
    link.download = 'Enterprise-Solutions-Brochure.pdf';
    link.click();
  };

  const solutions: SolutionType[] = [
    {
      id: 1,
      title: "All-in-One Operations (ERP)",
      description: "One secure place for finance, inventory, orders and production — automatic updates, no double entry, fewer errors, faster month-end closes.",
      features: ["Financial Management", "Inventory Control", "Order Processing", "Production Planning"],
      category: "ERP System",
    },
    {
      id: 2,
      title: "Customer & Sales Tracker (CRM)",
      description: "Every interaction remembered. Spot opportunities, follow up automatically, turn prospects into loyal customers — without scattered notes or emails.",
      features: ["Lead Management", "Sales Pipeline", "Customer Support", "Marketing Automation"],
      category: "CRM System",
    },
    {
      id: 3,
      title: "Live Performance Dashboards",
      description: "Key numbers front and center — sales, cash flow, stock alerts, team targets. Filter, drill down, decide faster. No more spreadsheet hunting.",
      features: ["Real-time Analytics", "KPI Tracking", "Custom Reports", "Data Visualization"],
      category: "Dashboards",
    },
    {
      id: 4,
      title: "Team & Workflow Tools",
      description: "HR, projects, approvals, documents — all organized. Cut WhatsApp/email chaos. Everyone knows what to do next, right now.",
      features: ["Project Management", "HR Portal", "Document Management", "Approval Workflows"],
      category: "Workflow Tools",
    }
  ];

  const principles: PrincipleType[] = [
    {
      id: 1,
      title: "Simple & Intuitive",
      description: "Built around how your team really works — find anything in 2–3 clicks.",
    },
    {
      id: 2,
      title: "Works on Any Device",
      description: "Phone, tablet, laptop — full functionality, perfect layout, everywhere.",
    },
    {
      id: 3,
      title: "Lightning Fast",
      description: "Instant loading. No waiting. Keeps your team in flow, not frustrated.",
    },
    {
      id: 4,
      title: "Personalized Views",
      description: "Role-based dashboards — show only what each person needs. Customize easily.",
    },
    {
      id: 5,
      title: "Clear Next Steps",
      description: "Prominent buttons guide every action. No guesswork. Higher accuracy & speed.",
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#FFECCD] via-white to-[#FFF9F0]">
      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#D51116] leading-tight tracking-tight">
          Custom Business Systems <span className="text-gray-800">Built for Growth</span>
        </h1>
        <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Tailored ERP, CRM, real-time dashboards and internal tools that eliminate manual work, 
          provide instant clarity, and scale with your business.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleScheduleDemo}
            className="px-8 py-4 bg-[#D51116] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-[#b50e12] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Schedule Free Demo
          </button>
          <button
            onClick={handleLearnMoreClick}
            className="px-8 py-4 bg-white text-[#D51116] font-semibold text-lg rounded-lg border-2 border-[#D51116] hover:bg-[#FFF0F0] transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="solutions-section" className="mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-[#FFF0F0] text-[#D51116] rounded-full text-sm font-semibold">
            ENTERPRISE SOLUTIONS
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Solutions That Solve Real Business Problems
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed to streamline your operations and drive growth
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              onClick={() => handleSolutionClick(solution.category)}
              className="group bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#D51116] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#FFF0F0] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {/* Use icons directly here */}
                <div className="relative w-10 h-10">
                  {solution.id === 1 && <FaCogs size={40} className="text-[#D51116]" />}
                  {solution.id === 2 && <FaUsers size={40} className="text-[#D51116]" />}
                  {solution.id === 3 && <FaChartBar size={40} className="text-[#D51116]" />}
                  {solution.id === 4 && <FaTasks size={40} className="text-[#D51116]" />}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D51116] transition-colors">
                {solution.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {solution.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSolutionClick(solution.category);
                }}
                className="mt-6 text-[#D51116] font-semibold text-sm hover:underline flex items-center gap-2"
              >
                View Details
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ContactSection />

    </section>
  );
}
