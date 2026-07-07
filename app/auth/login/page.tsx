"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/lib/auth";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

type Role = "Administrator" | "Manager" | "Employee" | "User";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

  // Single redirect path for every auth method — Google login no longer
  // hard-reloads the page separately, it just triggers this same effect.
  useEffect(() => {
    if (!authLoading && user) {
      const role = user.role as Role;

      switch (role) {
        case "Administrator":
        case "Manager":
        case "Employee":
        case "User":
        default:
          router.replace("/dashboard");
          break;
      }
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = email.trim();
    if (!emailRegex.test(value) && !usernameRegex.test(value)) {
      toast.error("Please enter a valid email address or username.");
      return;
    }

    setSubmitting(true);
    try {
      const success = await login(value, password);
      if (success) {
        toast.success("Welcome back.");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
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
        toast.success("Signed in with Google.");
        // No hard reload — the useEffect above handles redirect once
        // AuthContext picks up the new session on its own refresh cycle.
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      toast.error("Google authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F7F8F5] font-[var(--font-body)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        :root {
          --font-display: 'Fraunces', serif;
          --font-body: 'Inter', sans-serif;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .rotate-ring { animation: none !important; }
          .fade-up { animation: none !important; }
        }
      `}</style>

      {/* Left panel — brand / signature */}
      <aside className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-[#109489] flex-col justify-between px-14 py-12">
        {/* signature element: slow-rotating concentric access rings */}
        <div
          className="rotate-ring pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full"
          style={{
            animation: "rotate-slow 60s linear infinite",
            background:
              "repeating-radial-gradient(circle at center, transparent 0, transparent 38px, rgba(255,255,255,0.08) 39px, rgba(255,255,255,0.08) 40px)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full border border-white/[0.06]"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>A</span>
            </div>
            <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Access Portal</span>
          </div>
        </div>

        <div className="relative z-10 max-w-sm">
          {/* CILAD LA SAXAY: text-[#109489] on bg-[#109489] = qoraal aan muuqan */}
          <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Secure sign-in</p>
          <h1
            className="text-white text-[2.75rem] leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Your workspace,<br />one verified step away.
          </h1>
          <p className="text-white/50 text-[15px] leading-relaxed">
            Every sign-in is checked against your role and permissions before you land on your dashboard.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/35 text-xs">
          <span>© {new Date().getFullYear()}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>XALSOOR.COM</span>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] fade-up">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="h-8 w-8 rounded-md bg-[#109489] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>A</span>
            </div>
            <span className="text-[#109489] text-sm font-semibold tracking-wide uppercase">Access </span>
          </div>

          <h2
            className="text-[#109489] text-[2rem] leading-tight mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Sign in
          </h2>
          <p className="text-gray-500 text-[15px] mb-9">Enter your details to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-[#004414] uppercase tracking-wider">
                Email address
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} strokeWidth={1.75} />
                <input
                  id="email"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Email or Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-[15px] text-[#090044] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#109489]/40 focus:border-[#109489] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <label htmlFor="password" className="text-xs font-semibold text-[#090044] uppercase tracking-wider">
                  Password
                </label>
                <a href="/auth/forgot-password" className="text-xs font-medium text-[#109489] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} strokeWidth={1.75} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-lg border border-gray-200 text-[15px] text-[#090044] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#109489]/40 focus:border-[#109489] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#090044] transition-colors"
                >
                  {showPassword ? <EyeOff size={17} strokeWidth={1.75} /> : <Eye size={17} strokeWidth={1.75} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || authLoading}
              className="w-full bg-[#109489] hover:bg-[#090044] text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? (
                <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>


        </div>
      </main>
    </div>
  );
}