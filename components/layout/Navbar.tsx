"use client";

import { Search, Bell, Globe, ChevronDown, Menu, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface NavbarProps {
  isSidebarCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onOpenMobile: () => void; // Added for responsive support
}

export default function Navbar({ isSidebarCollapsed, onCollapse, onOpenMobile }: NavbarProps) {
  const { user, logout } = useAuth();
  const [currentLang, setCurrentLang] = useState("English");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const languages = [
    { name: "English", label: "English" },
    { name: "Arabic", label: "العربية" },
    { name: "Somali", label: "Soomaali" },
  ];

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-sm">
      
      {/* LEFT SIDE: TOGGLE & SEARCH */}
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        
        {/* Mobile Menu Button (Visible only on small screens) */}
        <button 
          onClick={onOpenMobile}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Toggle Button (Visible only on large screens) */}
        <button 
          onClick={() => onCollapse(!isSidebarCollapsed)}
          className="hidden lg:flex p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar - Hidden on very small mobile devices, visible from 'sm' up */}
        <div className="relative w-full max-w-md group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all" 
          />
        </div>
      </div>

      {/* RIGHT SIDE: ACTIONS */}
      <div className="flex items-center gap-2 md:gap-6">
        
        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-slate-600 text-sm hover:text-blue-600 transition-colors font-medium p-2">
            <Globe size={18} />
            <span className="hidden lg:inline">{currentLang}</span>
            <ChevronDown size={14} className="opacity-50" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden ring-1 ring-black/5">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setCurrentLang(lang.name)}
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-slate-200 transition-all hover:opacity-80 ${isProfileOpen ? 'opacity-80' : ''}`}
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                {user?.email?.split('@')[0] || "Admin"}
              </p>
              <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">
                {user?.role || "Super Admin"}
              </p>
            </div>

            <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-[#1e40af] flex items-center justify-center text-white font-bold shadow-md">
              {user?.email?.[0].toUpperCase() || "A"}
            </div>
            <ChevronDown size={14} className={`text-slate-400 hidden sm:block transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-100 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  onClick={() => logout?.()}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}