import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-[#090044] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold">
              Adnan<span className="text-[#00bf63]">Kahiye</span>
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              We provide professional ICT & digital solutions including
              video editing, graphic design, branding, web & application
              development, and social media management.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#00bf63]">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <Link href="/services" className="hover:text-[#00bf63] transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#00bf63] transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00bf63] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#00bf63]">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <span className="font-medium text-white">Email:</span>{" "}
                cadnankahiye@gmail.com
              </li>
              <li>
                <span className="font-medium text-white">Phone:</span>{" "}
                +252 610 631 155
              </li>
              <li>
                <span className="font-medium text-white">Location:</span>{" "}
                Somalia
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Adnan Kahiye. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-[#00bf63] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#00bf63] transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}