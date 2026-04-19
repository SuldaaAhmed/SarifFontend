"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import api from "@/lib/api";
import { FaLinkedin, FaFacebook, FaInstagram, FaCamera, FaLink } from "react-icons/fa";
import { Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateTeamMemberForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", status: "", linkedin: "", facebook: "", website: "", description: "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        toast.error("Access Denied. Please login first.");
        router.replace("/auth/login");
        // We do NOT setAuthLoading(false) here so the spinner stays 
        // until the router actually moves the user away.
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Image too large (Max 2MB)");
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage) return toast.error("Profile image is required!");
    
    setLoading(true);
    try {
      await AuthService.createTeamMember({ ...formData, coverImage });
      toast.success("Team member created successfully!");
      router.push("/join-success"); 
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- AUTH GUARD UI ---
  // This prevents the form from rendering if the user isn't logged in.
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#00bf63] mb-4" size={48} />
        <p className="text-gray-600 font-semibold">Verifying access...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white shadow-md rounded-2xl mb-4 text-[#00bf63] border border-gray-100">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-black text-[#090044] tracking-tight">Create Profile</h1>
          <p className="text-gray-600 mt-2 font-medium">Please fill in all details clearly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-200">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center pb-6 border-b border-gray-100">
            <label className="relative cursor-pointer group">
              <div className="w-36 h-36 rounded-full border-4 border-[#00bf63] p-1 shadow-inner bg-gray-50 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                ) : (
                  <FaCamera className="text-4xl text-gray-400 group-hover:text-[#00bf63]" />
                )}
              </div>
              <input type="file" required className="hidden" onChange={handleFile} accept="image/*" />
              <div className="absolute bottom-1 right-1 bg-[#090044] text-white p-2.5 rounded-full shadow-lg border-2 border-white">
                <FaCamera size={14} />
              </div>
            </label>
            <p className="text-sm font-bold text-[#090044] mt-4 uppercase tracking-tighter">Profile Picture *</p>
          </div>

          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Full Name</label>
              <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Eng. Fatima" 
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-[#00bf63] outline-none text-[#090044] font-semibold transition-colors placeholder:text-gray-300" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Role / Expertise</label>
              <input required name="status" value={formData.status} onChange={handleChange} placeholder="e.g. UX/UI Designer" 
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-[#00bf63] outline-none text-[#090044] font-semibold transition-colors placeholder:text-gray-300" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">About Mission</label>
            <textarea required name="description" value={formData.description} rows={3} onChange={handleChange} 
              placeholder="Briefly describe your work..." 
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-[#00bf63] outline-none text-[#090044] font-medium transition-colors resize-none placeholder:text-gray-300" />
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaLink className="text-[#00bf63]" size={16} />
              <span className="text-xs font-black text-[#090044] uppercase tracking-widest">Social Connections</span>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "linkedin", icon: <FaLinkedin className="text-[#0077b5]" />, placeholder: "LinkedIn URL" },
                { name: "facebook", icon: <FaFacebook className="text-[#1877f2]" />, placeholder: "Facebook URL" },
                { name: "website", icon: <FaInstagram className="text-[#e4405f]" />, placeholder: "Instagram URL" }
              ].map((link) => (
                <div key={link.name} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl drop-shadow-sm">
                    {link.icon}
                  </div>
                  <input required type="url" name={link.name} onChange={handleChange} placeholder={link.placeholder} 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-5 py-3 focus:border-[#00bf63] outline-none text-sm font-medium transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Center Button */}
          <div className="flex justify-center pt-6">
            <button type="submit" disabled={loading} 
              className="w-full bg-[#00bf63] hover:bg-[#090044] text-white font-bold py-2 rounded-xl shadow-lg shadow-[#00bf63]/20 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-tight">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>Join Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}