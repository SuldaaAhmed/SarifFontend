"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { CoursesService, CourseItem } from "@/lib/courses";
import { ArrowLeft, Loader2, CheckCircle, Play, Send } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
  course: CourseItem;
  onBack: () => void;
}

interface CourseType {
  id: string;
  name: string;
}

function SelectionContent({ course, onBack }: Props) {
  const router = useRouter();
  
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [types, setTypes] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeSelection, setActiveSelection] = useState<CourseType | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data) {
          setIsAuthenticated(true);
          setAuthLoading(false);
        } else {
          throw new Error("Not authenticated");
        }
      } catch (err) {
        toast.error("Please login to request a course.");
        router.replace("/auth/login");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTypes = async () => {
        try {
          const res = await CoursesService.getCourseTypes(course.id);
          if (res.data.success) {
            setTypes(res.data.data);
          }
        } catch (err) {
          toast.error("Failed to load tracks");
        } finally {
          setLoading(false);
        }
      };
      fetchTypes();
    }
  }, [course.id, isAuthenticated]);

  const handleFinalSubmit = async () => {
    if (!activeSelection) return toast.error("Please select a specialization first");

    setSubmitting(true);
    try {
      const requestBody = {
        courseId: course.id,
        courseTypeId: activeSelection.id,
        discountAmount: 0,
        paidAmount: 0,
        type: activeSelection.name
      };

      // const res = await CoursesService.createCourseRequest(requestBody);
      // if (res.data.success) {
      //   router.push(`/request-success?track=${encodeURIComponent(activeSelection.name)}&title=${encodeURIComponent(course.title)}`);
      // }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#00bf63] mb-4" size={48} />
        <p className="text-gray-600 font-semibold tracking-wide">Checking permissions...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#00bf63] mb-8 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
             <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              {!isPlaying ? (
                <>
                  <Image src={course.coverImageUrl} alt="Preview" fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <button onClick={() => setIsPlaying(true)} className="w-20 h-20 bg-[#00bf63] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all">
                      <Play size={32} fill="currentColor" />
                    </button>
                  </div>
                </>
              ) : (
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/GyEMbIRYVGA?autoplay=1" allowFullScreen></iframe>
              )}
            </div>
            <h2 className="text-3xl font-bold text-[#090044]">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-[#090044] mb-8">Choose Your Track</h3>
            
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#00bf63]" /></div>
              ) : (
                types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveSelection(type)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                      activeSelection?.id === type.id 
                      ? "border-[#00bf63] bg-white shadow-md" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {/* Fixed Text Visibility: Higher contrast and prevented shrinking */}
                    <span className={`font-bold text-lg leading-tight flex-1 pr-4 ${
                      activeSelection?.id === type.id ? "text-[#00bf63]" : "text-[#090044]"
                    }`}>
                      {type.name}
                    </span>
                    <CheckCircle 
                      className={`flex-shrink-0 ${activeSelection?.id === type.id ? "text-[#00bf63]" : "text-gray-200"}`} 
                      size={24} 
                    />
                  </button>
                ))
              )}
            </div>

            <button
              disabled={!activeSelection || submitting}
              onClick={handleFinalSubmit}
              className="w-full mt-10 bg-[#090044] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:bg-gray-300 transition-all shadow-xl"
            >
              {submitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Complete Request</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CourseTypeSelection(props: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00bf63]" size={40} />
      </div>
    }>
      <SelectionContent {...props} />
    </Suspense>
  );
}