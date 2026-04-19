"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowLeft, Mail } from "lucide-react";

export default function JoinRequestSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
        
        {/* Animated Icon Header */}
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 bg-[#e8f9f0] rounded-full flex items-center justify-center text-[#00bf63]">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#090044] text-white p-2 rounded-full border-4 border-white">
            <Clock size={16} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-[#090044] mb-4">Request Sent!</h1>
        <p className="text-gray-500 font-medium leading-relaxed mb-8">
          Thank you for your interest in joining our Team . Your application is currently 
          <span className="text-[#00bf63] font-bold"> pending approval</span> by our administrators.
        </p>

        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-gray-100 mb-8 text-left">
          <div className="flex gap-3 items-start">
            <div className="mt-1 text-[#00bf63]"><Mail size={18} /></div>
            <p className="text-sm text-gray-600 font-medium">
              We will send an email notification once your account is active.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link 
            href="/"
            className="w-full bg-[#00bf63] hover:bg-[#090044] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}