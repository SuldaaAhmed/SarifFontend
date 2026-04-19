"use client";

import {
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    slug: "blogs/case-study-inventory-management-system-for-accurate-zakat-calculation?id=091dee59-db71-4c1c-a44e-a17ef0cb39f1",
    title: "Inventory Management System",
    problem:
      "Ganacsigu ma awoodin inuu si sax ah u maareeyo hantidiisa (inventory), taasoo keentay jahawareer ku saabsan xisaabinta sakada.",
    solution:
      "Waxaan dhisnay nidaam (Inventory Management System) oo si toos ah u diiwaangeliya, ula socdo, una xisaabiya hantida ganacsiga, si loo helo tiro sax ah iyo xisaab sax ah oo sakada ah.",
    result:
      "Ganacsigu wuxuu helay xog sax ah oo ku saabsan hantidiisa (inventory), jahawareerkiina  waa la yareeyay, waxaana fududaatay xisaabinta sakada si sax ah oo hufan.",
  },
  {
    slug: "digital-payment",
    title: "Digital Payment System",
    problem:
      "Manual cash handling caused delays and lack of transparency.",
    solution:
      "Developed a digital payment system with QR-based transactions and real-time tracking.",
    result:
      "Improved transaction speed and reduced errors significantly.",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="bg-gray-50 py-16">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <span className="text-[#00bf63] font-semibold uppercase text-sm">
          Case Studies
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#090044] mt-3">
          Real Solutions, Real Results
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Systems designed and built to solve real business challenges and deliver measurable impact.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

          {caseStudies.map((item, index) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left flex flex-col justify-between"
            >

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#00bf63]/10 text-[#00bf63] mb-4">
                  <CheckCircle2 size={20} />
                </div>

                <h3 className="font-bold text-[#090044] mb-4">
                  {index + 1}. {item.title}
                </h3>

                <div className="space-y-4 text-sm text-gray-600">

                  <div className="flex gap-2">
                    <AlertCircle size={16} className="text-red-500 mt-1" />
                    <p>
                      <strong className="text-[#090044]">Problem:</strong>{" "}
                      {item.problem}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Lightbulb size={16} className="text-blue-500 mt-1" />
                    <p>
                      <strong className="text-[#090044]">Solution:</strong>{" "}
                      {item.solution}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <CheckCircle2 size={16} className="text-[#00bf63] mt-1" />
                    <p>
                      <strong className="text-[#090044]">Result:</strong>{" "}
                      <span className="font-medium text-[#090044]">
                        {item.result}
                      </span>
                    </p>
                  </div>

                </div>
              </div>

              {/* ✅ LINK UPDATED ONLY */}
              <div className="mt-6">
                <Link href={`${item.slug}`}>
                  <button className="flex items-center gap-2 text-[#00bf63] font-semibold hover:underline">
                    Read Case Study
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}