"use client";


import Link from "next/link";
import { useState, useRef  ,useEffect} from "react";
import { Phone, Mail, Facebook, Twitter, Linkedin, X } from "lucide-react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PublicNavbar() {
  const pathname = usePathname();

  const [specialistOpen, setSpecialistOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();


  const [user,setUser] = useState<any>(null);
const [profileOpen,setProfileOpen] = useState(false);

  // Mobile specialist accordion
  const [mobileSpecialistOpen, setMobileSpecialistOpen] = useState(false);

  const specialistTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close all mobile states together
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSpecialistOpen(false);
  };




useEffect(()=>{

const loadUser = async ()=>{

try{

const res = await api.get("/auth/me");

setUser(res.data);

}catch(err){

console.log("No user logged");

}

};

loadUser();

},[]);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#00bf63] text-white text-sm">
        <div className="mx-auto max-w-7xl px-6 py-2 grid grid-cols-3 items-center">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:info@kaftondigital.com"
              className="flex items-center gap-2 hover:text-[#FFECCD] transition"
            >
              <Mail className="h-4 w-4 text-[#FFECCD]" />
              cadnankahiye@gmail.com
            </a>

            <a
              href="tel:+252610000000"
              className="flex items-center gap-2 hover:text-[#FFECCD] transition"
            >
              <Phone className="h-4 w-4 text-[#FFECCD]" />
              +252 610 631 155
            </a>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex items-center gap-3 rounded-full bg-[#090044] px-4 py-1">
              <span className="rounded-full bg-[#00bf63] px-2 py-0.5 text-xs font-bold text-white">
                NEW
              </span>
              <span className="text-white">
                I help businesses build secure, scalable system
              </span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#FFECCD] transition"
              rel="noreferrer"
            >
              <Facebook className="h-5 w-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-[#FFECCD] transition"
              rel="noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </a>

            <a
              href="https://so.linkedin.com/in/adnan-kahiye-a5531630b"
              target="_blank"
              className="hover:text-[#FFECCD] transition"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>




      {/* ================= MAIN NAVBAR ================= */}
      <header className="fixed top-[36px] left-0 right-0 z-40 bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
<Link href="/#hero" className="flex items-center group">
      <div className="relative w-[140px] h-[50px] md:w-[170px] md:h-[60px]">
        <Image
          src="/Images/logo.png"
          alt="Adnan Kahiye Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
  </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-12">
            <NavLink href="/" pathname={pathname}>
              Home
            </NavLink>

            {/* SPECIALIST DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (specialistTimeout.current) clearTimeout(specialistTimeout.current);
                setSpecialistOpen(true);
              }}
              onMouseLeave={() => {
                specialistTimeout.current = setTimeout(
                  () => setSpecialistOpen(false),
                  180
                );
              }}
            >
              <button
                type="button"
                className="relative font-semibold text-gray-800 hover:text-[#00bf63] transition"
              >
                Specialist ▾
              </button>

              <div
                className={`absolute left-0 mt-4 w-[340px] rounded-xl bg-white shadow-xl border border-gray-100 p-4 transition-all duration-150
                ${
                  specialistOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                onMouseEnter={() => {
                  if (specialistTimeout.current) clearTimeout(specialistTimeout.current);
                }}
                onMouseLeave={() => {
                  specialistTimeout.current = setTimeout(
                    () => setSpecialistOpen(false),
                    180
                  );
                }}
              >
                <SpecialistDropdown closeMenu={() => setSpecialistOpen(false)} />
              </div>
            </div>

            <NavLink href="/blogs" pathname={pathname}>
              Blogs
            </NavLink>
            <NavLink href="/Marketting" pathname={pathname}>
              Marketting 
            </NavLink>
            <NavLink href="/about-us" pathname={pathname}>
              Who am I
            </NavLink>
            <NavLink href="/contact" pathname={pathname}>
              Contact Us
            </NavLink>
          </nav>




{/* LOGIN - DESKTOP */}

{!user ? (

<Link
href="/auth/login"
className="hidden lg:inline-flex items-center justify-center rounded-full bg-[#00bf63] px-6 py-3 text-white font-semibold hover:bg-[#090044] transition"
>
Login
</Link>

) : (

<div
className="relative hidden lg:block"
onMouseEnter={() => setProfileOpen(true)}
onMouseLeave={() => setProfileOpen(false)}
>

{/* USER BUTTON */}

<div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition">

<div className="w-9 h-9 bg-[#00bf63] text-white rounded-full flex items-center justify-center text-sm font-semibold">

{user.email?.charAt(0).toUpperCase()}

</div>

<span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
{user.email}
</span>

</div>

{/* DROPDOWN */}

{profileOpen && (

<div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

{/* USER INFO */}

<div className="flex items-center gap-3 px-4 py-4 bg-gray-50">

<div className="w-10 h-10 rounded-full bg-[#00bf63] text-white flex items-center justify-center font-semibold">

{user.email?.charAt(0).toUpperCase()}

</div>

<div className="flex flex-col">

<span className="text-sm font-semibold text-gray-800 truncate">
{user.email}
</span>

<span className="text-xs text-gray-400">
Account
</span>

</div>

</div>

{/* MENU ITEMS */}

<Link
href="/profile"
className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
>

<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.364 4.56 9 9 0 015.121 17.804z" />
</svg>

<span className="font-medium">Profile</span>

</Link>

<div className="border-t border-gray-100"></div>

<button
onClick={async () => {
try {

await api.post("/auth/logout");

setUser(null);

router.push("/");
router.refresh();

} catch (err) {

console.error("Logout failed", err);

}
}}
className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition"
>

<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
</svg>

<span className="font-medium">Logout</span>

</button>

</div>

)}

</div>

)}

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-2xl p-2 text-gray-700 hover:text-[#090044]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : "☰"}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`
            lg:hidden fixed inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out
            ${
              mobileOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="px-6 py-8 max-h-[calc(100vh-120px)] overflow-auto">
            {/* ✅ Now all items are same style */}
            <nav className="flex flex-col items-center gap-4">
              <MobileNavItem
                href="/"
                active={pathname === "/"}
                onClick={closeMobileMenu}
              >
                Home
              </MobileNavItem>

              <MobileAccordionItem
                title="Specialist"
                open={mobileSpecialistOpen}
                setOpen={setMobileSpecialistOpen}
              >
                <div className="flex flex-col gap-2">
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    Backend API Development
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    System Architecture & Scalability
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    Database Administration
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    Security Hardening & Compliance
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    Performance Optimization
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    DevOps & CI/CD Automation
                  </MobileLink>
                  <MobileLink href="/Expertise" onClose={closeMobileMenu}>
                    Docker & Kubernetes
                  </MobileLink>
                </div>
              </MobileAccordionItem>

              <MobileNavItem
                href="/blogs"
                active={pathname === "/blogs"}
                onClick={closeMobileMenu}
              >
                Blogs
              </MobileNavItem>

              <MobileNavItem
                href="/Marketting"
                active={pathname === "/Marketting"}
                onClick={closeMobileMenu}
              >
                Marketting
              </MobileNavItem>

              <MobileNavItem
                href="/about-us"
                active={pathname === "/about-us"}
                onClick={closeMobileMenu}
              >
                Who am I
              </MobileNavItem>

              <MobileNavItem
                href="/contact"
                active={pathname === "/contact"}
                onClick={closeMobileMenu}
              >
                Contact
              </MobileNavItem>

          {!user ? (

<Link
href="/auth/login"
onClick={closeMobileMenu}
className="mt-2 w-full max-w-sm inline-flex justify-center rounded-full bg-[#00bf63] px-8 py-3 text-white font-semibold"
>
Login
</Link>

) : (

<div className="w-full max-w-sm flex flex-col gap-2">

<div className="bg-gray-100 px-4 py-3 rounded-xl text-center">

<span className="font-semibold text-gray-700">

{user.email}

</span>

</div>

<Link
href="/profile"
onClick={closeMobileMenu}
className="w-full rounded-xl px-5 py-4 bg-white text-gray-800"
>

Profile

</Link>

<button
onClick={()=>{

fetch("/api/auth/logout",{method:"POST"});
location.reload();

}}
className="w-full rounded-xl px-5 py-4 bg-red-100 text-red-600"
>

Logout

</button>

</div>

)}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

/* ================= NAV LINK ================= */
function NavLink({ href, pathname, children }: any) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`relative transition
        ${
          active
            ? "font-bold text-[#00bf63]"
            : "font-medium text-gray-700 hover:text-[#090044]"
        }
        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#00bf63]
        ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}
        after:transition-all`}
    >
      {children}
    </Link>
  );
}

/* ================= DESKTOP DROPDOWN ================= */
function SpecialistDropdown({ closeMenu }: { closeMenu: () => void }) {
  const links: [string, string][] = [
    ["Backend API Development", "/Expertise"],
    ["System Architecture & Scalability", "/Expertise"],
    ["Security Hardening & Compliance", "/Expertise"],
    ["Performance Optimization", "/Expertise"],
    ["DevOps & CI/CD Automation", "/Expertise"],
    ["Docker & Kubernetes", "/Expertise"],
  ];

  return (
    <ul className="space-y-1">
      {links.map(([label, href]) => (
        <li key={label}>
          <Link
            href={href}
            onClick={closeMenu}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00bf63] transition"
          >
            <span>{label}</span>
            <span className="text-[#00bf63]">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ================= MOBILE NAV ITEM ================= */
function MobileNavItem({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`w-full max-w-sm rounded-xl px-5 py-4 text-lg font-medium transition
        ${active ? "bg-white text-[#00bf63] shadow-sm" : "bg-white/70 text-gray-800 hover:bg-white"}
      `}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        <span className="text-gray-300">→</span>
      </div>
    </Link>
  );
}

/* ================= MOBILE ACCORDION ITEM ================= */
function MobileAccordionItem({
  title,
  open,
  setOpen,
  children,
}: {
  title: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white/70">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between rounded-xl transition hover:bg-white"
      >
        <span className="text-lg font-bold text-[#00bf63]">{title}</span>
        <span className="text-xl text-gray-600">{open ? "−" : "+"}</span>
      </button>

      <div
        className={`px-4 pb-4 overflow-hidden transition-all duration-200
          ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}

/* ================= MOBILE NESTED LINK ================= */
function MobileLink({ href, children, onClose }: any) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="w-full rounded-lg px-4 py-3 bg-white/70 hover:bg-white transition flex items-center justify-between"
    >
      <span className="text-sm font-medium text-gray-800">{children}</span>
      <span className="text-gray-300">→</span>
    </Link>
  );
}