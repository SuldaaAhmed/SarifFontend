"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { AuthService } from "@/lib/auth";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

type Role = "Administrator" | "Manager" | "Employee" | "User";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // --- FIX: Logic to handle redirection only when user is logged in ---
  useEffect(() => {
    if (!authLoading && user) {
      const role = user.role as Role;
      if (role === "User") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Welcome back!");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) return;

    setSubmitting(true);
    try {
      const res = await AuthService.googleLogin({ idToken });
      if (res.data?.success) {
        const token = res.data?.data?.token;
        if (token) localStorage.setItem("token", token);
        
        toast.success("Google Sign-in successful");
        window.location.href = "/"; // Force refresh to update context
      }
    } catch (err) {
      toast.error("Google authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:border-[#00bf63] focus:ring-[#00bf63] transition-all bg-white";

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00bf63]/10 via-white to-white px-6">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00bf63] text-white shadow-lg shadow-[#00bf63]/20 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#090044]">Login</h1>
          <p className="text-gray-500 mt-2">Access your account securely</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#090044] uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-[#090044] uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-semibold text-[#00bf63] hover:underline">Forgot?</button>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || authLoading}
              className="w-full bg-[#00bf63] hover:bg-[#090044] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Sign In"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-gray-400">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs font-bold uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed")}
              theme="outline"
              shape="pill"
              width="320px"
            />
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600">
          New here? <a href="/auth/register" className="text-[#00bf63] font-bold hover:underline">Create an account</a>
        </p>
      </div>
    </section>
  );
}