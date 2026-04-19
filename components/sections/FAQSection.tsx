"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Who am I?",
    answer:
      "I am a software engineer and system builder focused on designing and developing scalable business systems that solve real operational problems.",
  },
  {
    question: "Where do I work?",
    answer:
      "I work with clients, businesses, and organizations across different industries, delivering digital solutions remotely and through project-based collaboration.",
  },
  {
    question: "How do I work?",
    answer:
      "I follow a structured approach: understanding the business problem, designing the right system, building the solution, and continuously improving it based on performance and real needs.",
  },
  {
    question: "Do I work alone or collaborate with others?",
    answer:
      "I collaborate with other talented professionals, including designers, developers, and creative specialists, whenever a project requires broader expertise.",
  },
  {
    question: "What is my work style?",
    answer:
      "My work style is practical, structured, and results-driven, focused on solving problems, building efficient systems, and delivering solutions that create long-term value.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-[#00bf63]/5 to-white">
      <div className="mx-auto max-w-6xl px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div>
            <span
              className="inline-block mb-4 rounded-full
              bg-white border border-[#00bf63]/30
              px-5 py-1 text-xs font-semibold
              text-[#00bf63] uppercase tracking-wide"
            >
              FAQ
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044] leading-tight">
              Frequently Asked <br className="hidden sm:block" />
              Questions
            </h2>

            <p className="mt-4 max-w-md text-gray-600">
              Find clear answers to the most common questions about our services,
              process, and how we help businesses succeed.
            </p>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white
                  border border-[#00bf63]/20
                  transition-all duration-300
                  hover:shadow-lg"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-[#090044]">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 items-center justify-center
                      rounded-full border transition-all
                      ${
                        isOpen
                          ? "bg-[#00bf63] border-[#00bf63] text-white"
                          : "border-[#00bf63]/40 text-[#090044]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-sm text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}