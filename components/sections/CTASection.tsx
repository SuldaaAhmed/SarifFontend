import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-orange-500 py-20">
      <div className="mx-auto max-w-6xl px-4 text-center text-white">

        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Grow Your Business?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-orange-100">
          Let’s work together to build powerful digital solutions that help
          your business compete and succeed in today’s market.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-orange-600 hover:bg-orange-100 transition"
          >
            Start your journey
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
