"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { CoursesService, CourseItem } from "@/lib/courses";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import CourseTypeSelection from "../Courses/CourseTypeSelection"; // Adjust path as needed

export default function MyExpertiseSection() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Updated to correct spelling 'summary' as per our API fix
        const res = await CoursesService.getAllCoursesSummary(1, 20);
        if (res.data.success) {
          setCourses(res.data.data.items);
        }
      } catch (err) {
        toast.error("Failed to load expertise data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const visibleItems = showAll ? courses : courses.slice(0, 6);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#00bf63] mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading expertise...</p>
      </div>
    );
  }

  // --- CONDITIONAL RENDERING ---
  // If a course is selected, show the CourseTypeSelection component instead
  if (selectedCourse) {
    return (
      <CourseTypeSelection 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
      />
    );
  }

  return (
    <section id="expertise" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#090044]">
            My Expertise
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Specialized technical areas where I design, build, and optimize secure and scalable systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.coverImageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold bg-[#00bf63]/10 text-[#00bf63] px-3 py-1 rounded-full uppercase">
                    {item.level}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    ${item.price} / Month
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#090044] mb-3 group-hover:text-[#00bf63] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm flex-1 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <button
                  onClick={() => setSelectedCourse(item)}
                  className="mt-6 w-full rounded-xl bg-[#00bf63] text-white py-3 font-bold hover:bg-[#090044] transition-all active:scale-95 shadow-lg shadow-[#00bf63]/20"
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border-2 border-[#00bf63] text-[#00bf63] font-semibold hover:bg-[#00bf63] hover:text-white transition-all"
            >
              {showAll ? "Show Less" : `View More (${courses.length - 6} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}