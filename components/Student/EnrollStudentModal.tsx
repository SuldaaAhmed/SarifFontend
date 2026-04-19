"use client";

import React, { useEffect, useState } from "react";
import { CoursesService } from "@/lib/courses";
import { StudentService } from "@/lib/students";
import toast from "react-hot-toast";
import { BookOpen, DollarSign, Award, Loader2 } from "lucide-react";

interface CourseDto {
  id: string;
  title: string;
  level: string;
  price: number;
  durationInMonths: number;
  coverImageUrl: string;
}

interface Props {
  open: boolean;
  studentId: string;
  studentName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EnrollStudentModal({ open, studentId, studentName, onClose, onSuccess }: Props) {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCourses();
    } else {
      setSelectedCourseId(""); // Reset on close
    }
  }, [open]);

  const fetchCourses = async () => {
    setFetching(true);
    try {
      const res = await CoursesService.getAllCoursesSummary();
      if (res.data.success) {
        // Based on your payload, the items are inside res.data.data.items
        setCourses(res.data.data.items || []);
      }
    } catch (err) {
      toast.error("Failed to load courses");
    } finally {
      setFetching(false);
    }
  };

  const handleEnroll = async () => {
    if (!selectedCourseId) return toast.error("Please select a course");
    
    setLoading(true);
    try {
      const res = await StudentService.enrollCourse({
        studentId: studentId,
        courseId: selectedCourseId
      });

      if (res.data.success) {
        toast.success(`Successfully enrolled ${studentName}`);
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER */}
        <div className="p-6 border-b bg-gray-50/50 text-center">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Course Enrollment</h3>
          <p className="text-sm text-gray-500 mt-1">
            Enrolling: <span className="text-indigo-600 font-semibold">{studentName}</span>
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Select Available Course
            </label>
            
            <div className="relative">
              {fetching ? (
                <div className="flex items-center justify-center py-3 border rounded-xl bg-gray-50">
                   <Loader2 className="w-5 h-5 animate-spin text-indigo-600 mr-2" />
                   <span className="text-sm text-gray-500">Fetching courses...</span>
                </div>
              ) : (
                <select
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 text-sm transition-all"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  <option value="">-- Click to select a course --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} — ${course.price} ({course.level})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* COURSE PREVIEW (Optional: Shows details of selected course) */}
          {selectedCourseId && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 animate-in fade-in slide-in-from-top-1">
              {(() => {
                const selected = courses.find(c => c.id === selectedCourseId);
                return selected ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <Award size={14} className="text-indigo-500" /> {selected.level}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <DollarSign size={14} className="text-emerald-500" /> ${selected.price}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            disabled={loading || !selectedCourseId}
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Confirm Enrollment
          </button>
        </div>
      </div>
    </div>
  );
}