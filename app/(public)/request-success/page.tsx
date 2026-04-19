"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Home, Loader2 } from "lucide-react";
import ReactConfetti from 'react-confetti';
import { useEffect, useState, Suspense } from "react";

// 1. Move the main UI and logic into a sub-component
function SuccessContent() {
  const searchParams = useSearchParams();
  
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const trackName = searchParams.get("track") || "Specialization";
  const courseTitle = searchParams.get("title") || "Course";

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <ReactConfetti 
        width={windowSize.width} 
        height={windowSize.height} 
        recycle={false} 
        numberOfPieces={200} 
        gravity={0.1} 
        colors={['#00bf63', '#090044']} 
      />

      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-16 text-center">
        
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00bf63] blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 border-4 border-[#00bf63]/10">
              <CheckCircle2 size={80} className="text-[#00bf63]" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-[#090044] mb-4 tracking-tight">
          Request Received!
        </h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Great choice! You have successfully requested to join the <span className="font-bold text-[#090044]">{trackName}</span> track in 
          our <span className="text-[#00bf63] font-semibold">{courseTitle}</span> program.
        </p>

        <div className="bg-[#090044]/5 rounded-3xl p-6 mb-10 text-left border border-[#090044]/5">
          <h2 className="text-xs font-bold text-[#090044]/50 uppercase tracking-widest mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-[#00bf63] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <p className="text-sm text-gray-600">Our instructors will review your profile and specialization choice.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-[#00bf63] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <p className="text-sm text-gray-600">You will receive an email confirmation with enrollment details within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => router.push("/Expertise")}
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-[#090044] text-white py-4 px-10 rounded-2xl font-bold hover:bg-[#1a0b6e] transition-all active:scale-95 shadow-xl shadow-[#090044]/10"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>

        <p className="mt-12 text-gray-400 text-xs font-medium uppercase tracking-tighter">
          Adnan Kahiye Academy &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

// 2. Wrap the component in Suspense to fix the build error
export default function JoinSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#00bf63]" size={40} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}