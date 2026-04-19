import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CasStudeySection from "@/components/sections/CaseStudiesSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import ProcessSection from "@/components/sections/ProcessSection";


export default function HomePage() {
  return (
   <main className="overflow-x-hidden">

      {/* HERO */}
      <section id="hero" className="scroll-mt-24">
        <HeroSection />
      </section>


      {/* WHITE SPACE */}
      <section className="h-12 md:h-12 bg-white"></section>

      {/* MY SERVICES */}
      <section id="services" className="scroll-mt-24">
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="scroll-mt-24">
        <WhyChooseUsSection />
      </section>

      {/* PORTFOLIO */}
      <section id="process" className="scroll-mt-24">
        <ProcessSection />
      </section>

        <section id="case-studies" className="scroll-mt-24">
        <CasStudeySection />
      </section>


      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-24">
        <TestimonialsSection />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQSection />
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>

    </main>
  );
}