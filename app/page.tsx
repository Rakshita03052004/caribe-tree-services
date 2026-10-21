import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Storm from "@/components/Storm";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Estimate from "@/components/Estimate";
import Area from "@/components/Area";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Storm />
        <BeforeAfter />
        <Process />
        <Reviews />
        <Area />
        <Estimate />
        <Faq />
      </main>
      <Footer />
    </LangProvider>
  );
}
