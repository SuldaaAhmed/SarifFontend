"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = [
  "DOMAINS",
  "HOSTING",
  "VPS",
] as const;

type Tab = typeof TABS[number];

const DATA: Record<
  Tab,
  { title: string; desc: string; image: string; link: string }[]
> = {
  DOMAINS: [
    {
      title: "Namecheap",
      desc: "Affordable domain registration with great features.",
      image: "/Images/Namecheap.png",
      link: "",
    },
    {
      title: "GoDaddy",
      desc: "Popular domain registrar used worldwide.",
      image: "/Images/Bluehost.png",
      link: "",
    },
    {
      title: "Cloudflare Domains",
      desc: "Secure domain registration with transparent pricing.",
      image: "/Images/Cloudflare.png",
      link: "",
    },
  ],

  HOSTING: [
    {
      title: "Hostinger",
      desc: "Affordable and fast hosting for websites and startups.",
      image: "/Images/Hostinger.png",
      link: "",
    },
    {
      title: "Bluehost",
      desc: "Reliable hosting platform for beginners and businesses.",
      image: "/Images/Bluehost.png",
      link: "",
    },
    {
      title: "SiteGround",
      desc: "High performance hosting with excellent support.",
      image: "/Images/SiteGround.png",
      link: "",
    },
  ],

  VPS: [
    {
      title: "DigitalOcean",
      desc: "Simple and powerful cloud infrastructure for developers.",
      image: "/Images/DigitalOcean.png",
      link: "",
    },
    {
      title: "Vultr",
      desc: "High performance cloud VPS with global data centers.",
      image: "/Images/Vultr.png",
      link: "",
    },
    {
      title: "Linode",
      desc: "Developer friendly cloud VPS with predictable pricing.",
      image: "/Images/Linode.png",
      link: "",
    },
  ],
};

export default function AffiliateSection() {
  const [tab, setTab] = useState<Tab>("DOMAINS");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-[#090044]">
            Tools & <span className="text-[#00bf63]">Platforms</span>
          </h2>

          <p className="mt-4 text-gray-600">
            A selection of hosting providers, VPS infrastructure, and domain services
            used in modern web development.
          </p>

          <p className="mt-4 text-xs text-gray-500 max-w-lg mx-auto">
            Disclosure: Some links on this page may be affiliate links. If you purchase
            through them, I may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* TABS */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                tab === t
                  ? "bg-[#00bf63] text-white shadow-md"
                  : "border border-[#00bf63] text-[#090044] hover:bg-[#00bf63]/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DATA[tab].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6 text-center flex flex-col flex-grow">
                <h3 className="font-bold text-[#090044] text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-grow">
                  {item.desc}
                </p>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-5 py-2.5 bg-[#00bf63] text-white text-sm rounded-lg hover:bg-green-600 transition"
                  >
                    Visit Website
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block mt-6 px-5 py-2.5 bg-gray-300 text-gray-600 text-sm rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}