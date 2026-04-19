import AboutMe from "@/components/sections/AboutMeSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function AboutMePage() {

  return (  
 <> 
    <div className="py-8">
 <AboutMe />;

   {/* SERVICES */}
       <section id="services" className="scroll-mt-24">
         <ServicesSection />
       </section>
    </div>
  </>  
  )
  
  
 
}
